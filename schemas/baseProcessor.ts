import { ExecutionContext } from "../executionContext"
import { ProcessorDef, ProcessorResponse } from "./"

export class BaseProcessor {

    constructor(protected executionContext: ExecutionContext, protected processorDef: ProcessorDef) {

    }

    public fx(args: any): Promise<ProcessorResponse> {
        return Promise.resolve({
            successful: false
        })
    }
    
}