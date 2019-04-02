import { ExecutionContext } from '../executionContext'
import { ProcessorDef, ILogger } from '../schemas'
import { ProcessorResponse, ProcessorErrorResponse } from '../responses'

export class BaseProcessor {

    protected logger: ILogger = null

    constructor(protected executionContext: ExecutionContext, protected processorDef: ProcessorDef) {
        this.logger = executionContext.logger
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
            this.logger.error(this.executionContext.correlationId, result.message, source)
            return result
        }
        return err
    }
    
}