import { RuleProcessor } from '../processors'
import { ProcessorResponse, ProcessorErrorResponse } from '../responses'
import { IRuleContainerSchema, KeyValuePair } from '../schemas'

export class MockRuleProcessor extends RuleProcessor {

    public async mockFx(documentOfValues: Array<KeyValuePair>, policies: Array<IRuleContainerSchema>): Promise<ProcessorResponse|ProcessorErrorResponse> {

        const result = await super.processRuleExecutionDocument(documentOfValues, policies)
        
        return {
            successful: result.pass,
            data: [].concat(result.notes)
        }

    }

    public async mockFx2(objectOfValues: any, policies: Array<IRuleContainerSchema>): Promise<ProcessorResponse|ProcessorErrorResponse> {

        const result = await super.processRuleExecutionObject(objectOfValues, policies)
        
        return {
            successful: result.pass,
            data: [].concat(result.notes)
        }

    }

}
