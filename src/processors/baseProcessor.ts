import { ExecutionContext } from '../executionContext'
import { ProcessorDef } from '../schemas'
import { ProcessorResponse, ProcessorErrorResponse } from '../responses'

export class BaseProcessor {

    constructor(protected executionContext: ExecutionContext, protected processorDef: ProcessorDef) {

    }

    public fx(): Promise<ProcessorResponse|ProcessorErrorResponse> {
        return Promise.resolve({
            successful: false
        })
    }

    protected handleError(err, source, httpStatus?) {
        if (!(err instanceof(ProcessorErrorResponse))) {
            const result = new ProcessorErrorResponse()
            result.message = err.message
            if (httpStatus) {
                result.httpStatus = httpStatus
            }
            result.err = err
            result.source = source
            return result
        }
        return err
    }
    
}