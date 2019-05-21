import { ILogger } from '../schemas';
import { RuleExecutionResponse } from '../responses';
export declare class RuleEngineHelper {
    private logger;
    private _functions;
    constructor(logger: ILogger);
    getRuleFunction(className: string): Function;
    loadDefaultRuleFunctions(): void;
    registerRuleFunction(className: string, fx: Function): void;
    noop(): RuleExecutionResponse;
}
