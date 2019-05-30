import { RuleProcessor } from '../processors';
import { ProcessorResponse, ProcessorErrorResponse } from '../responses';
import { IRuleContainerSchema } from '../schemas';
export declare class MockRuleProcessor extends RuleProcessor {
    mockFx(value: any, ruleset: IRuleContainerSchema): Promise<ProcessorResponse | ProcessorErrorResponse>;
}
