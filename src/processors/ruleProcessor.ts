import { BaseProcessor } from './baseProcessor'
import { ProcessorResponse, ProcessorErrorResponse, RuleExecutionResponse, 
    GroupRuleExecutionResponse, RuleContainerExecutionResponse } from '../responses'
import { IRuleContainerSchema, IRuleGroup, Rule, ILogger, ProcessorDef, KeyValuePair } from '../schemas'
import { RuleEngineHelper, Utilities, Logger } from '../utilities'
import { ExecutionContext } from '../executionContext'

import { sortBy, filter, find } from 'lodash'

/*
    Rules are loaded into a Dictionary at application startup index.ts via RuleEngineHelper.loadDefaultRuleFunctions()
    Custom rules may be declared at startup by the author using RuleEngineHelper.registerRuleFunction()
*/

export class RuleProcessor extends BaseProcessor {

    private _canWork = true
    private ruleEngineHelper: RuleEngineHelper = null

    constructor(protected executionContext: ExecutionContext, protected processDef: ProcessorDef, protected logger: ILogger) {
        super(executionContext, processDef, logger)
        if (!executionContext.getSharedResource('RuleEngineHelper')) {
            logger.error(executionContext.correlationId,
                `Attempted to run a rule processor without assigning RuleEngineHelper as a shared resource.`,
                `RuleProcessor.Ctor`)
            this._canWork = false
            return
        }
        this.ruleEngineHelper = executionContext.getSharedResource('RuleEngineHelper')
    }

    fx(): Promise<ProcessorResponse|ProcessorErrorResponse> {
        throw new Error('Not implemented on Base Class RuleProcessor. Must override method fx and call base method getRuleResult.')
    }

    protected processRuleExecutionObject(ObjectOfValues: any, policies: Array<IRuleContainerSchema>): Promise<any> {

        if (!ObjectOfValues || Object.getOwnPropertyNames(ObjectOfValues).length <= 0 || !policies || policies.length <= 0) {
            return Promise.resolve({
                pass: false,
                notes: [`Invalid ObjectOfValues parameter or policy list`],
                results: []
            })
        }
        const documentOfValues: Array<KeyValuePair> = []
        const keys = Object.getOwnPropertyNames(ObjectOfValues)
        keys.forEach((key) => {
            documentOfValues.push({
                key,
                value: ObjectOfValues[key]
            })
        })
        return this.processRuleExecutionDocument(documentOfValues, policies)
    }

    protected processRuleExecutionDocument(documentOfValues: Array<KeyValuePair>, policies: Array<IRuleContainerSchema>): Promise<any> {

        let allNotes = []
        return new Promise(async(resolve, reject) => {
            try {
                if (!documentOfValues || documentOfValues.length <= 0 || !policies || policies.length <= 0) {
                    return reject({
                        pass: false,
                        notes: [`Invalid document of values or policy list`],
                        results: []
                    })
                }
                const functionsToExecute = []
                documentOfValues.forEach((datarow) => {
                    const ruleContainer = find(policies, { name: datarow.key})
                    if (!ruleContainer) {
                        allNotes.push(`${datarow.key}: No rule with that name exists in policies`)
                    } else {
                        functionsToExecute.push(this.getRuleResult(datarow.value, ruleContainer))
                    }
                })

                if (functionsToExecute && functionsToExecute.length > 0) {
                    const finalResult = await Promise.all(functionsToExecute)
                    let didAllPass = true
                    finalResult.forEach((result) => {
                        allNotes = allNotes.concat(result.notes)
                        if (!result.pass) {
                            didAllPass = false
                        }
                    })
                    return resolve({
                        pass: didAllPass,
                        notes: [].concat(allNotes),
                        results: [].concat(finalResult)
                    })
                } else {
                    return resolve({
                        pass: false,
                        notes: [`No rule functions loaded to be executed`].concat(allNotes),
                        results: []
                    })
                }
            }
            catch (err) {
                return reject({
                    pass: false,
                    notes: [].concat(allNotes).concat(err.message),
                    results: []
                })
            }
        })

    }

    private getRuleResult(value: any, ruleset: IRuleContainerSchema): Promise<RuleContainerExecutionResponse> {
        
        if (!this._canWork) {
            this.logger.error(this.executionContext.correlationId,
                `Cannot getRuleResult because no sharedResource named 'RuleEngineHelper is available on this execution context.`,
                `RuleProcessor.getRuleResult()`)
                return Promise.reject({
                    pass: false,
                    notes: [`Cannot getRuleResult because no sharedResource named 'RuleEngineHelper is available on this execution context.`],
                    name: ruleset.name,
                    ruleCount: ruleset.rules ? ruleset.rules.length : 0,
                    groupCount: ruleset.groups ? ruleset.groups.length : 0
                })
        }
        if (!ruleset || !ruleset.rules || ruleset.rules.length <= 0) {
            return Promise.resolve({
                pass: false,
                notes: [`Invalid ruleset`],
                name: ruleset && ruleset.name ? ruleset.name : 'unknown',
                ruleCount: 0,
                groupCount: 0
            })
        }

        return new Promise((resolve, reject) => {
            try {
                let getOutOfJailFree = false
                /*
                    0. Check if value is required or not. If not, and is empty, ignore rules.
                    1. Setup groups of rules and put into sequential order using lodash
                    2. If there are no groups, create an array of one group and put rules into it
                    3. Pass each group to the rule group process and get resposne
                    4. Response should be PASS or FAIL with an array of messages
                    5. Decide if Groups as a whole PASS based on micro group responses
                */
                if (Utilities.isNullOrUndefined(value) && !ruleset.required) {
                   getOutOfJailFree = true
                }
        
                if (ruleset.dataType) {
                    if (!Utilities.isDataType(value, ruleset.dataType)) {
                        return resolve({
                            pass: false,
                            notes: [`${ruleset.name}: Value ${value} is not data type ${ruleset.dataType}`].concat(ruleset.note ? ruleset.note : null),
                            name: ruleset.name,
                            ruleCount: ruleset.rules.length,
                            groupCount: ruleset.groups ? ruleset.groups.length : 0
                        })
                    }
                }
        
                if (!ruleset.groups || ruleset.groups.length === 0) {
                    ruleset.groups = []
                    ruleset.groups.push({
                        id: 'A',
                        ordinal: 0,
                        conjunction: 'and',
                        result: false,
                        notes: []
                    })
                    ruleset.rules.forEach((rule) => {
                        rule.group = 'A'
                    })
                }
        
                const sortedGroups = sortBy(ruleset.groups, 'ordinal')
                const allNotes = []
                sortedGroups.forEach((group) => {
                    if (!group.conjunction) {
                        group.conjunction = 'and'
                    }
                    if (!group.notes) {
                        group.notes = []
                    }
                    const groupRules = filter(ruleset.rules, { group: group.id })
                    this.processRuleGroup(value, group, groupRules, ruleset.name)
                    allNotes.push(group.notes)
                })
                // Consolidate all notes into one array for all groups
                
                // Now we have all the outcomes in sortedGroups. Check for conjunctions etc.
                if (sortedGroups.length === 1) {
                    // Just one group so whatever outcome it had is the answer
                    if (!sortedGroups[0].result && ruleset.note) {
                        allNotes.push(ruleset.note)
                    }
                    return resolve({
                        pass: getOutOfJailFree ? true : sortedGroups[0].result,
                        notes: [].concat(...allNotes),
                        name: ruleset.name,
                        ruleCount: ruleset.rules.length,
                        groupCount: 1
                    })
                }
                
                // We have more than one group. Determine based on conjunction if is PASS or FAIL
                // First, look for any 'or' conjunction. If an 'or' exists and is valid, return PASS
                const orGroups = filter(sortedGroups, { conjunction: 'or' })
                if (orGroups && orGroups.length > 0) {
                    orGroups.forEach((group) => {
                        if (group.result) {
                            return resolve({
                                pass: true,
                                notes: [].concat(...allNotes),
                                name: ruleset.name,
                                ruleCount: ruleset.rules.length,
                                groupCount: ruleset.groups.length
                            })
                        }
                    })
                }
                // Either an or group failed or we are left with only and groups
                // Process now looking for any failure
                const andGroups = filter(sortedGroups, { conjunction: 'and' })
                let isFailure = true
                if (andGroups && andGroups.length > 0) {
                    // It could have been only OR groups
                    isFailure = false
                    andGroups.forEach((group) => {
                        if (!group.result) {
                            isFailure = true
                        }
                    })
                }
                if (isFailure && ruleset.note) {
                    allNotes.push(ruleset.note)
                }
                return resolve({
                    pass: getOutOfJailFree ? true : !isFailure,
                    notes: [].concat(...allNotes),
                    name: ruleset.name,
                    ruleCount: ruleset.rules.length,
                    groupCount: ruleset.groups.length
                })
            }
            catch (err) {
                return reject({
                    pass: false,
                    notes: [].concat[`Error Executing Ruleset ${ruleset.name}: ${err.message}`],
                    name: ruleset.name,
                    ruleCount: ruleset.rules.length,
                    groupCount: ruleset.groups.length
                })
            }
        })

    }

    private processRuleGroup(value: any, group: IRuleGroup, rules: Array<Rule>, ruleName: string): GroupRuleExecutionResponse {
        
        const sortedRules = sortBy(rules, 'ordinal')
        let andFailure = false
        let orSuccess = false
        sortedRules.forEach((rule) => {
            if (!rule.conjunction) {
                rule.conjunction = 'and'
            }
            const ruleResponse = this.processRule(value, rule, ruleName)
            rule.result = ruleResponse.pass
            if (!ruleResponse || !ruleResponse.pass && rule.conjunction === 'and') {
                andFailure = true
            }
            if (ruleResponse && ruleResponse.pass && rule.conjunction === 'or') {
                orSuccess = true
            }
            if (ruleResponse.note) {
                group.notes.push(ruleResponse.note)
            }
        })
        // TODO: Handle 'or' conjunction within group
        group.result = !andFailure || orSuccess
        return {
            pass: group.result,
            notes: [].concat(...group.notes),
            groupConjunction: group.conjunction
        }

    }

    private processRule(value: any, rule: Rule, ruleName: string): RuleExecutionResponse {
        
        const ruleFunction = this.ruleEngineHelper.getRuleFunction(rule.className)
        if (!ruleFunction) {
            return {
                pass: false,
                note: `Unable to locate RuleFunction ${rule.className}`
            }
        }

        // Convert value if necessary
        const convertedValue: any = Utilities.toDataType(value, rule.dataType)

        const result = ruleFunction(convertedValue, rule.args)
        const didPass = result === !rule.expectFalse
        
        return {
            pass: didPass,
            note: !didPass && rule.note ? `${ruleName}: ${rule.note}` : null
        }

    }

}
