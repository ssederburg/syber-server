import { RuleProcessor } from '../processors'
import { ProcessorResponse, ProcessorErrorResponse } from '../responses'
import { IRuleContainerSchema } from '../schemas'

export class MockRuleProcessor extends RuleProcessor {

    public mockFx(value: any, ruleset: IRuleContainerSchema): Promise<ProcessorResponse|ProcessorErrorResponse> {

        return super.getRuleResult(value, ruleset)

    }

}