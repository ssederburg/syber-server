import { RuleProcessor } from '../processors';
import { ProcessorResponse, ProcessorErrorResponse } from '../responses';
import { IRuleContainerSchema, KeyValuePair } from '../schemas';
export declare class MockRuleProcessor extends RuleProcessor {
    mockFx(documentOfValues: Array<KeyValuePair>, policies: Array<IRuleContainerSchema>): Promise<ProcessorResponse | ProcessorErrorResponse>;
    mockFx2(objectOfValues: any, policies: Array<IRuleContainerSchema>): Promise<ProcessorResponse | ProcessorErrorResponse>;
}
