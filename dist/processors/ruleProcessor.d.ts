import { BaseProcessor } from './baseProcessor';
import { ProcessorResponse, ProcessorErrorResponse } from '../responses';
import { IRuleContainerSchema, ILogger, ProcessorDef } from '../schemas';
import { ExecutionContext } from '../executionContext';
export declare class RuleProcessor extends BaseProcessor {
    protected executionContext: ExecutionContext;
    protected processDef: ProcessorDef;
    protected logger: ILogger;
    private _canWork;
    private ruleEngineHelper;
    constructor(executionContext: ExecutionContext, processDef: ProcessorDef, logger: ILogger);
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
    protected getRuleResult(value: any, ruleset: IRuleContainerSchema): Promise<ProcessorResponse | ProcessorErrorResponse>;
    private processRuleGroup;
    private processRule;
}
