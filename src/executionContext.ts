import { Schematic } from './schematics'
import { RequestContext, Parameter, Activity, SharedResource, 
    ExecutionMode, ProcessorDef, SchematicResponse, ILogger } from './schemas'
import { ProcessorResponse, ProcessorErrorResponse } from './responses'
import { BaseProcessor } from './processors'
import { Utilities } from './utilities/utilities'
import { SyberServerEvents } from './events'
import { SyberServer } from './syberServer'

import * as _ from 'lodash'
import { RawResponse, ErrorResponse } from './responses'

export class ExecutionContext {

    public httpStatus: number = 200
    public correlationId: string = ''
    public errors = []
    public warnings = []
    
    public document: any = {}

    private parameters: Array<Parameter> = []
    private wasOneCriticalFailure: boolean = false
    private logger: ILogger = null


    constructor(public req: RequestContext, public schematic: Schematic, private sharedResources: Array<SharedResource>, private syberServer: SyberServer) { // SyberServer
        this.correlationId = req.id
        this.logger = syberServer.logger
    }

    public execute(): Promise<any> {

        const result = new Promise(async(resolve, reject) => {
            try {
                // Evaluate Input Parameters
                await this.loadParameters()
                await this.runActivities(this.schematic.activities)
                
                const response = await this.respond()
                return resolve(response)
            }
            catch (err) {
                if (!this.wasOneCriticalFailure) {
                    this.wasOneCriticalFailure = true
                    if (this.httpStatus === 200) {
                        this.logger.warn(this.req.id, `Error was thrown within ExecutionContext WITHOUT setting httpStatus to non-200. Check code path and set http status to correct fail code...`, `executionContext.execute`)
                        this.httpStatus = 500
                    }
                    const firstErrorResponse = await this.respond()
                    this.logger.log(this.req.id, `executionContext.execute.error: Throwing ${JSON.stringify(firstErrorResponse, null, 1)}`, `executionContext.execute`)
                    return reject(firstErrorResponse)
                }
                const secondErrorResponse = await this.errorResponse()
                this.logger.log(this.req.id, `executionContext.execute.error.secondchance: Throwing ${JSON.stringify(secondErrorResponse, null, 1)}`, `executionContext.execute`)
                return reject(secondErrorResponse)
            }
        })

        return result
    }

    public getParameterValue(name: string): any {
        const theParamRecord = _.find(this.parameters, {name: name})
        if (!theParamRecord) return null
        return theParamRecord.value
    }

    public getSharedResource(name: string): any {
        const theTypeRecord = _.find(this.sharedResources, {name: name})
        if (!theTypeRecord) return null
        return theTypeRecord.instanceOfType
    }

    private runActivities(activities: Array<Activity>): Promise<any> {

        const result = new Promise((resolve, reject) => {
            try {
                if (!activities || activities.length <= 0) {
                    return resolve(true)
                }
                // TODO: To allow dynamic activity injection, use queue on Execution Context and shift completed items out
                const processTasks = []
                let counter = 0
                _.forEach(_.sortBy(activities, 'ordinal'), async(activityDef: Activity) => {
                    this.syberServer.events.emit(SyberServerEvents.ActivityStarted, {
                        source: `ExecutionContext.runActivities`,
                        correlationId: this.correlationId,
                        schematic: this.schematic.id,
                        activity: activityDef.id
                    })
                    processTasks.push(this.runProcesses(activityDef.id, activityDef.processes, activityDef.executionMode))
                    // TODO: Track ProcessorResponse for httpStatus !== 200
                    await Promise.all(processTasks).then(async() => {
                        await this.runActivities(activityDef.activities)
                        counter = counter + 1
                        if (counter >= activities.length) {
                            this.syberServer.events.emit(SyberServerEvents.ActivityEnded, {
                                source: `ExecutionContext.runActivities`,
                                correlationId: this.correlationId,
                                schematic: this.schematic.id,
                                activity: activityDef.id
                            })
                            return resolve(true)
                        }
                    }).catch((err) => {
                        this.logger.log(this.req.id, `${err.message}`, `executionContext.runActivities`)
                        this.errors.push(`ExecutionContext.runActvities.error: ${err.message}`)
                        this.httpStatus = err.httpStatus
                        return reject(err)
                    })
                })
            }
            catch (err) {
                return reject(err)
            }
        })

        return result

    }

    private runProcesses(activityId: string, processes: Array<ProcessorDef>, executionMode: ExecutionMode): Promise<any> {

        const result = new Promise(async(resolve, reject) => {
            try {
                if (!processes || processes.length <= 0) {
                    return resolve(true)
                }
                const tasks = []
                _.forEach(_.sortBy(processes, 'ordinal'), (process: ProcessorDef) => {
                    this.syberServer.events.emit(SyberServerEvents.ProcessorStarted, {
                        source: `ExecutionContext.runProcesses`,
                        correlationId: this.correlationId,
                        schematic: this.schematic.id,
                        activity: activityId,
                        processor: process.class.name.toString()
                    })
                    // TODO: Load using Factory with name string
                    // TODO: Sequential vs. Concurrent
                    if (process.class && !process.className) {
                        const test = new process.class(this, process, this.logger)
                        tasks.push(this.tryCatchWrapperForProcess(test, process).then((response) => {
                            this.syberServer.events.emit(SyberServerEvents.ProcessorEnded, {
                                source: `ExecutionContext.runProcesses`,
                                correlationId: this.correlationId,
                                schematic: this.schematic.id,
                                activity: activityId,
                                processor: process.class.name.toString(),
                                response: Object.assign({}, response)
                            })
                        }))
                    }
                })
                const response = await Promise.all(tasks)
                // TODO: Check ProcessorResponse for httpStatus !== 200
                // TODO: Return a Processor Response consolidation
                if (response.indexOf(false) >= 0) {
                    return resolve(false)
                }
                return resolve(true)
            }
            catch (err) {
                this.logger.log(this.req.id, `${err.message}`, `executionContext.runProcesses`)
                return reject(err)
            }
        })

        return result

    }

    private respond(): Promise<any> {

        const result = new Promise(async(resolve, reject) => {
            try {
                let theType: typeof BaseProcessor = null
                let test: SchematicResponse = _.find(this.schematic.responses, { httpStatus: this.httpStatus })
                if (!test) {
                    test = this.syberServer.getGlobalSchematicResponse(this.httpStatus)
                    if (!test) {
                        this.logger.warn(this.req.id, `syber-server.executionContext.respond.error: no record of response for http status ${this.httpStatus}`, `executionContext.respond`)
                        theType = RawResponse
                    } else {
                        theType = test.class
                    }
                } else {
                    // TODO: Implement resolver
                    theType = test.class
                }
                // TODO: Load from String using Factory
                const task = new theType(this, test, this.logger)
                const response = await this.tryCatchWrapperForProcess(task, test)
                return resolve(response.data || response)
            }
            catch (err) {
                if (this.httpStatus === 200) {
                    this.httpStatus = 500
                }
                this.errors.push(`syber-server.executionContext.respond().error`)
                return reject(err)
            }
        })

        return result

    }

    private tryCatchWrapperForProcess(processor: BaseProcessor, process: ProcessorDef): Promise<ProcessorResponse|ProcessorErrorResponse> {
        
        const result: Promise<ProcessorResponse|ProcessorErrorResponse> = new Promise(async(resolve, reject) => {
            try {
                const response = await processor.fx()
                return resolve(response)
            }
            catch (err) {
                if (this.httpStatus === 200) {
                    this.httpStatus = 500
                }
                return reject(err)
            }
        })

        return result

    }

    private loadParameters(): Promise<any> {

        const result = new Promise((resolve, reject) => {
            try {
                let wasOneInvalid = false
                if (this.schematic && this.schematic.parameters && this.schematic.parameters.length > 0) {
                    this.syberServer.events.emit(SyberServerEvents.ExecutionContextBeforeLoadParameters, {
                        source: `ExecutionContext.loadParameters`,
                        correlationId: this.correlationId,
                        schematic: this.schematic.id,
                        parameters: Object.assign({}, this.schematic.parameters)
                    })
                    _.forEach(this.schematic.parameters, (parameter: Parameter) => {
                        const value = Utilities.evalExpression(parameter.source, this.req)
                        parameter.isValid = true
                        // Is Required Validation
                        if (parameter.required && Utilities.isNullOrUndefined(value)) {
                            parameter.isValid = false
                            this.errors.push(`Parameter ${parameter.name} is required.`)
                        }
                        // Data Type Validation
                        if (value && parameter.dataType && parameter.isValid) {
                            parameter.isValid = Utilities.isDataType(value, parameter.dataType)
                            if (!parameter.isValid) {
                                this.errors.push(`Parameter ${parameter.name} is an invalid data type. Should be ${parameter.dataType}.`)
                            }
                        }
                        // White List Validation
                        if (value && parameter.isValid && parameter.whiteList && parameter.whiteList.length > 0) {
                            parameter.isValid = parameter.whiteList.indexOf(value) >= 0
                            if (!parameter.isValid) {
                                this.errors.push(`Parameter ${parameter.name} is invalid. Not in white list of values.`)
                            }
                        }
                        // Black List Validation
                        if (value && parameter.isValid && parameter.blackList && parameter.blackList.length > 0) {
                            parameter.isValid = parameter.blackList.indexOf(value) < 0
                            if (!parameter.isValid) {
                                this.errors.push(`Parameter ${parameter.name} is invalid. Value is in black list of values.`)
                            }
                        }
                        // Custom Validation
                        if (value && parameter.isValid && parameter.validators && parameter.validators.length > 0) {
                            _.forEach(parameter.validators, (validator) => {
                                if (Utilities.isFunction(validator)) {
                                    const testResult = validator(value)
                                    if (!testResult) {
                                        parameter.isValid = false
                                    }
                                }
                                // TODO: Validator Factory from ClassName
                            })
                            if (!parameter.isValid) {
                                this.errors.push(`Parameter ${parameter.name} is invalid. Value failed custom validation check.`)
                            }
                        }
                        if (!parameter.isValid) {
                            wasOneInvalid = true
                        } else {
                            const newParam = Object.assign({}, parameter, {value: value})
                            this.parameters.push(newParam)
                        }
                    })
                    this.syberServer.events.emit(SyberServerEvents.ExecutionContextAfterLoadParameters, {
                        source: `ExecutionContext.loadParameters`,
                        correlationId: this.correlationId,
                        schematic: this.schematic.id,
                        parameters: Object.assign({}, this.parameters)
                    })
                    if (wasOneInvalid) {
                        this.httpStatus = 400
                        throw new Error('Invalid Request')
                    }
                }
                resolve()
            }
            catch (err) {
                this.logger.error(this.req.id, `${err.message}`, `executionContext.loadParameters`)
                this.errors.push(`ExecutionContext.loadParameters: ${err.message}`)
                if (this.httpStatus === 200) {
                    this.httpStatus = 500
                }
                reject(err)
            }
        })

        return result

    }

    private errorResponse(): Promise<any> {

        const result = new Promise(async(resolve, reject) => {
            try {
                if (this.httpStatus === 200) {
                    this.httpStatus = 500
                }
                const test = {
                    class: ErrorResponse
                }
                const task = new ErrorResponse(this, test, this.logger)
                const response = await this.tryCatchWrapperForProcess(task, test)
                return resolve(response.data || response)
            }
            catch (err) {
                const test = Object.assign({}, {
                    httpStatus: this.httpStatus || 500,
                    errors: this.errors || ['Unknown Error'],
                    warnings: this.warnings || []
                })
                return resolve(test)
            }
        })

        return result

    }
}