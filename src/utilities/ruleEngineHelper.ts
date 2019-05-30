import { RuleLookup, ILogger } from '../schemas'
import { RuleExecutionResponse } from '../responses'
import * as Validators from '../validators'

import { find } from 'lodash'

export class RuleEngineHelper {

    private _functions: Array<RuleLookup> = []

    constructor(private logger: ILogger) {}

    public getRuleFunction(className: string): Function {
        
        const result = find(this._functions, { className })
        if (!result) {
            this.logger.warn(`SYSTEM`, `No record of rule ${className}`, `RuleEngineHelper.getRuleFunction()`)
            return this.noop
        }
        return result.fx

    }

    public loadDefaultRuleFunctions(): void {
        this.registerRuleFunction('Contains', Validators.Contains)
        this.registerRuleFunction('ContainsAny', Validators.ContainsAny)
        this.registerRuleFunction('DateRange', Validators.DateRange)
        this.registerRuleFunction('EndsWith', Validators.EndsWith)
        this.registerRuleFunction('EndsWithAny', Validators.EndsWithAny)
        this.registerRuleFunction('Equals', Validators.Equals)
        this.registerRuleFunction('EqualsAny', Validators.EqualsAny)
        this.registerRuleFunction('IsArray', Validators.IsArray)
        this.registerRuleFunction('IsDate', Validators.IsDate)
        this.registerRuleFunction('IsFloat', Validators.IsFloat)
        this.registerRuleFunction('IsNotNullOrEmpty', Validators.IsNotNullOrEmpty)
        this.registerRuleFunction('IsNullOrEmpty', Validators.IsNullOrEmpty)
        this.registerRuleFunction('IsNumber', Validators.IsNumber)
        this.registerRuleFunction('IsObject', Validators.IsObject)
        this.registerRuleFunction('IsString', Validators.IsString)
        this.registerRuleFunction('Length', Validators.Length)
        this.registerRuleFunction('Max', Validators.Max)
        this.registerRuleFunction('MaxDate', Validators.MaxDate)
        this.registerRuleFunction('MaxLength', Validators.MaxLength)
        this.registerRuleFunction('Min', Validators.Min)
        this.registerRuleFunction('MinDate', Validators.MinDate)
        this.registerRuleFunction('MinLength', Validators.MinLength)
        this.registerRuleFunction('Range', Validators.Range)
        this.registerRuleFunction('RegEx', Validators.RegEx)
        this.registerRuleFunction('StartsWith', Validators.StartsWith)
        this.registerRuleFunction('StartsWithAny', Validators.StartsWithAny)
    }

    public registerRuleFunction(className: string, fx: Function): void {

        const result = find(this._functions, { className })
        if (result) {
            this.logger.warn(`SYSTEM`, `Attempted to reregister Rule Function ${className}`, `RuleEngineHelper.registerRuleFunction()`)
            return
        }
        this._functions.push({
            className,
            fx
        })

    }

    public noop(): RuleExecutionResponse {
        return {
            pass: false,
            notes: ['Invalid Rule className or arguments']
        }
    }

}