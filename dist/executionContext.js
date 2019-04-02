var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Utilities } from './utilities/utilities';
import { SyberServerEvents } from './events';
import * as _ from 'lodash';
import { RawResponse, ErrorResponse } from './responses';
export class ExecutionContext {
    constructor(req, schematic, sharedResources, syberServer) {
        this.req = req;
        this.schematic = schematic;
        this.sharedResources = sharedResources;
        this.syberServer = syberServer;
        this.httpStatus = 200;
        this.correlationId = '';
        this.logger = null;
        this.errors = [];
        this.warnings = [];
        this.document = {};
        this.parameters = [];
        this.wasOneCriticalFailure = false;
        this.correlationId = req.id;
        this.logger = syberServer.logger;
    }
    execute() {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loadParameters();
                yield this.runActivities(this.schematic.activities);
                const response = yield this.respond();
                return resolve(response);
            }
            catch (err) {
                if (!this.wasOneCriticalFailure) {
                    this.wasOneCriticalFailure = true;
                    if (this.httpStatus === 200) {
                        this.logger.warn(this.req.id, `Error was thrown within ExecutionContext WITHOUT setting httpStatus to non-200. Check code path and set http status to correct fail code...`, `executionContext.execute`);
                        this.httpStatus = 500;
                    }
                    const firstErrorResponse = yield this.respond();
                    this.logger.log(this.req.id, `executionContext.execute.error: Throwing ${JSON.stringify(firstErrorResponse, null, 1)}`, `executionContext.execute`);
                    return reject(firstErrorResponse);
                }
                const secondErrorResponse = yield this.errorResponse();
                this.logger.log(this.req.id, `executionContext.execute.error.secondchance: Throwing ${JSON.stringify(secondErrorResponse, null, 1)}`, `executionContext.execute`);
                return reject(secondErrorResponse);
            }
        }));
        return result;
    }
    getParameterValue(name) {
        const theParamRecord = _.find(this.parameters, { name: name });
        if (!theParamRecord)
            return null;
        return theParamRecord.value;
    }
    getSharedResource(name) {
        const theTypeRecord = _.find(this.sharedResources, { name: name });
        if (!theTypeRecord)
            return null;
        return theTypeRecord.instanceOfType;
    }
    runActivities(activities) {
        const result = new Promise((resolve, reject) => {
            try {
                if (!activities || activities.length <= 0) {
                    return resolve(true);
                }
                const processTasks = [];
                let counter = 0;
                _.forEach(_.sortBy(activities, 'ordinal'), (activityDef) => __awaiter(this, void 0, void 0, function* () {
                    this.syberServer.events.emit(SyberServerEvents.ActivityStarted, {
                        source: `ExecutionContext.runActivities`,
                        correlationId: this.correlationId,
                        schematic: this.schematic.id,
                        activity: activityDef.id
                    });
                    processTasks.push(this.runProcesses(activityDef.id, activityDef.processes, activityDef.executionMode));
                    yield Promise.all(processTasks).then(() => __awaiter(this, void 0, void 0, function* () {
                        yield this.runActivities(activityDef.activities);
                        counter = counter + 1;
                        if (counter >= activities.length) {
                            this.syberServer.events.emit(SyberServerEvents.ActivityEnded, {
                                source: `ExecutionContext.runActivities`,
                                correlationId: this.correlationId,
                                schematic: this.schematic.id,
                                activity: activityDef.id
                            });
                            return resolve(true);
                        }
                    })).catch((err) => {
                        this.logger.log(this.req.id, `${err.message}`, `executionContext.runActivities`);
                        this.errors.push(`ExecutionContext.runActvities.error: ${err.message}`);
                        this.httpStatus = err.httpStatus;
                        return reject(err);
                    });
                }));
            }
            catch (err) {
                return reject(err);
            }
        });
        return result;
    }
    runProcesses(activityId, processes, executionMode) {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!processes || processes.length <= 0) {
                    return resolve(true);
                }
                const tasks = [];
                _.forEach(_.sortBy(processes, 'ordinal'), (process) => {
                    this.syberServer.events.emit(SyberServerEvents.ProcessorStarted, {
                        source: `ExecutionContext.runProcesses`,
                        correlationId: this.correlationId,
                        schematic: this.schematic.id,
                        activity: activityId,
                        processor: process.class.name.toString()
                    });
                    if (process.class && !process.className) {
                        const test = new process.class(this, process);
                        tasks.push(this.tryCatchWrapperForProcess(test, process).then((response) => {
                            this.syberServer.events.emit(SyberServerEvents.ProcessorEnded, {
                                source: `ExecutionContext.runProcesses`,
                                correlationId: this.correlationId,
                                schematic: this.schematic.id,
                                activity: activityId,
                                processor: process.class.name.toString(),
                                response: Object.assign({}, response)
                            });
                        }));
                    }
                });
                const response = yield Promise.all(tasks);
                if (response.indexOf(false) >= 0) {
                    return resolve(false);
                }
                return resolve(true);
            }
            catch (err) {
                this.logger.log(this.req.id, `${err.message}`, `executionContext.runProcesses`);
                return reject(err);
            }
        }));
        return result;
    }
    respond() {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let theType = null;
                let test = _.find(this.schematic.responses, { httpStatus: this.httpStatus });
                if (!test) {
                    test = this.syberServer.getGlobalSchematicResponse(this.httpStatus);
                    if (!test) {
                        this.logger.warn(this.req.id, `syber-server.executionContext.respond.error: no record of response for http status ${this.httpStatus}`, `executionContext.respond`);
                        theType = RawResponse;
                    }
                    else {
                        theType = test.class;
                    }
                }
                else {
                    theType = test.class;
                }
                const task = new theType(this, test);
                const response = yield this.tryCatchWrapperForProcess(task, test);
                return resolve(response.data || response);
            }
            catch (err) {
                if (this.httpStatus === 200) {
                    this.httpStatus = 500;
                }
                this.errors.push(`syber-server.executionContext.respond().error`);
                return reject(err);
            }
        }));
        return result;
    }
    tryCatchWrapperForProcess(processor, process) {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield processor.fx();
                return resolve(response);
            }
            catch (err) {
                if (this.httpStatus === 200) {
                    this.httpStatus = 500;
                }
                return reject(err);
            }
        }));
        return result;
    }
    loadParameters() {
        const result = new Promise((resolve, reject) => {
            try {
                let wasOneInvalid = false;
                if (this.schematic && this.schematic.parameters && this.schematic.parameters.length > 0) {
                    this.syberServer.events.emit(SyberServerEvents.ExecutionContextBeforeLoadParameters, {
                        source: `ExecutionContext.loadParameters`,
                        correlationId: this.correlationId,
                        schematic: this.schematic.id,
                        parameters: Object.assign({}, this.schematic.parameters)
                    });
                    _.forEach(this.schematic.parameters, (parameter) => {
                        const value = Utilities.evalExpression(parameter.source, this.req);
                        parameter.isValid = true;
                        if (parameter.required && Utilities.isNullOrUndefined(value)) {
                            parameter.isValid = false;
                            this.errors.push(`Parameter ${parameter.name} is required.`);
                        }
                        if (value && parameter.dataType && parameter.isValid) {
                            parameter.isValid = Utilities.isDataType(value, parameter.dataType);
                            if (!parameter.isValid) {
                                this.errors.push(`Parameter ${parameter.name} is an invalid data type. Should be ${parameter.dataType}.`);
                            }
                        }
                        if (value && parameter.isValid && parameter.whiteList && parameter.whiteList.length > 0) {
                            parameter.isValid = parameter.whiteList.indexOf(value) >= 0;
                            if (!parameter.isValid) {
                                this.errors.push(`Parameter ${parameter.name} is invalid. Not in white list of values.`);
                            }
                        }
                        if (value && parameter.isValid && parameter.blackList && parameter.blackList.length > 0) {
                            parameter.isValid = parameter.blackList.indexOf(value) < 0;
                            if (!parameter.isValid) {
                                this.errors.push(`Parameter ${parameter.name} is invalid. Value is in black list of values.`);
                            }
                        }
                        if (value && parameter.isValid && parameter.validators && parameter.validators.length > 0) {
                            _.forEach(parameter.validators, (validator) => {
                                if (Utilities.isFunction(validator)) {
                                    const testResult = validator(value);
                                    if (!testResult) {
                                        parameter.isValid = false;
                                    }
                                }
                            });
                            if (!parameter.isValid) {
                                this.errors.push(`Parameter ${parameter.name} is invalid. Value failed custom validation check.`);
                            }
                        }
                        if (!parameter.isValid) {
                            wasOneInvalid = true;
                        }
                        else {
                            const newParam = Object.assign({}, parameter, { value: value });
                            this.parameters.push(newParam);
                        }
                    });
                    this.syberServer.events.emit(SyberServerEvents.ExecutionContextAfterLoadParameters, {
                        source: `ExecutionContext.loadParameters`,
                        correlationId: this.correlationId,
                        schematic: this.schematic.id,
                        parameters: Object.assign({}, this.parameters)
                    });
                    if (wasOneInvalid) {
                        this.httpStatus = 400;
                        throw new Error('Invalid Request');
                    }
                }
                resolve();
            }
            catch (err) {
                this.logger.error(this.req.id, `${err.message}`, `executionContext.loadParameters`);
                this.errors.push(`ExecutionContext.loadParameters: ${err.message}`);
                if (this.httpStatus === 200) {
                    this.httpStatus = 500;
                }
                reject(err);
            }
        });
        return result;
    }
    errorResponse() {
        const result = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.httpStatus === 200) {
                    this.httpStatus = 500;
                }
                const test = {
                    class: ErrorResponse
                };
                const task = new ErrorResponse(this, test);
                const response = yield this.tryCatchWrapperForProcess(task, test);
                return resolve(response.data || response);
            }
            catch (err) {
                const test = Object.assign({}, {
                    httpStatus: this.httpStatus || 500,
                    errors: this.errors || ['Unknown Error'],
                    warnings: this.warnings || []
                });
                return resolve(test);
            }
        }));
        return result;
    }
}
