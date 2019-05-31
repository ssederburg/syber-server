import { BaseProcessor } from './baseProcessor'
import { ProcessorResponse, ProcessorErrorResponse, RuleExecutionResponse, GroupRuleExecutionResponse } from '../responses'
import { IRuleContainerSchema, IRuleGroup, Rule, ILogger, ProcessorDef } from '../schemas'
import { RuleEngineHelper, Utilities, Logger } from '../utilities'
import { ExecutionContext } from '../executionContext'

import { sortBy, filter } from 'lodash'

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

    protected getRuleResult(value: any, ruleset: IRuleContainerSchema): Promise<ProcessorResponse|ProcessorErrorResponse> {
        
        if (!this._canWork) {
            this.logger.error(this.executionContext.correlationId,
                `Cannot getRuleResult because no sharedResource named 'RuleEngineHelper is available on this execution context.`,
                `RuleProcessor.getRuleResult()`)
                return Promise.reject({
                    successful: false
                })
        }
        if (!ruleset || !ruleset.rules || ruleset.rules.length <= 0) {
            return Promise.resolve({
                successful: true
            })
        }

        /*
            0. Check if value is required or not. If not, and is empty, ignore rules.
            1. Setup groups of rules and put into sequential order using lodash
            2. If there are no groups, create an array of one group and put rules into it
            3. Pass each group to the rule group process and get resposne
            4. Response should be PASS or FAIL with an array of messages
            5. Decide if Groups as a whole PASS based on micro group responses
        */
        if (Utilities.isNullOrUndefined(value) && !ruleset.required) {
            return Promise.resolve({
                successful: true
            })
        }

        return new Promise((resolve, reject) => {
            try {
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
                    const groupRules = filter(ruleset.rules, { group: group.id })
                    this.processRuleGroup(value, group, groupRules)
                    allNotes.push(group.notes)
                })
                // Consolidate all notes into one array for all groups
                
                // Now we have all the outcomes in sortedGroups. Check for conjunctions etc.
                if (sortedGroups.length === 1) {
                    // Just one group so whatever outcome it had is the answer
                    return resolve({
                        successful: sortedGroups[0].result,
                        data: [].concat(...allNotes)
                    })
                }
                
                // We have more than one group. Determine based on conjunction if is PASS or FAIL
                // First, look for any 'or' conjunction. If an 'or' exists and is valid, return PASS
                const orGroups = filter(sortedGroups, { conjunction: 'or' })
                if (orGroups && orGroups.length > 0) {
                    orGroups.forEach((group) => {
                        if (group.result) {
                            return resolve({
                                successful: true,
                                data: [].concat(allNotes)
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
                return resolve({
                    successful: isFailure,
                    data: [].concat(allNotes)
                })
            }
            catch (err) {
                return reject(this.handleError(err, `RuleProcessor.getRuleResult`))
            }
        })

    }

    private processRuleGroup(value: any, group: IRuleGroup, rules: Array<Rule>): GroupRuleExecutionResponse {
        
        const sortedRules = sortBy(rules, 'ordinal')
        let andFailure = false
        let orSuccess = false
        sortedRules.forEach((rule) => {
            if (!rule.conjunction) {
                rule.conjunction = 'and'
            }
            const ruleResponse = this.processRule(value, rule)
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

    private processRule(value: any, rule: Rule): RuleExecutionResponse {
        
        const ruleFunction = this.ruleEngineHelper.getRuleFunction(rule.className)
        if (!ruleFunction) {
            return {
                pass: false,
                note: `Unable to locate RuleFunction ${rule.className}`
            }
        }
        if (!rule.shouldBe) {
            rule.shouldBe = true
        }
        // Convert value if necessary
        let convertedValue: any = value
        switch(rule.dataType) {
            case 'string':
                convertedValue = value.toString()
                break
            case 'number':
                convertedValue = Utilities.toInt(value)
                break
            case 'decimal':
            case 'float':
                convertedValue = Utilities.toFloat(value)
            case 'date':
                // TODO: Add formatting
                convertedValue = Utilities.toDate(value)
            case 'boolean':
            case 'bool':
                convertedValue = Utilities.toBoolean(value)
            default:
                convertedValue = value
        }
        
        const result = ruleFunction(convertedValue, rule.args)
        const didPass = result === rule.shouldBe
        
        return {
            pass: didPass,
            note: !didPass ? rule.note : null
        }

    }

}
