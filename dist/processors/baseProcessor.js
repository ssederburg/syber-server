import { ProcessorErrorResponse } from '../responses';
export class BaseProcessor {
    constructor(executionContext, processorDef) {
        this.executionContext = executionContext;
        this.processorDef = processorDef;
        this.logger = null;
    }
    fx() {
        return Promise.resolve({
            successful: false
        });
    }
    handleError(err, source, httpStatus) {
        if (!(err instanceof (ProcessorErrorResponse))) {
            const result = new ProcessorErrorResponse();
            result.message = err.message;
            if (httpStatus) {
                result.httpStatus = httpStatus;
            }
            result.err = err;
            result.source = source;
            this.logger.error(this.executionContext.correlationId, result.message, source);
            return result;
        }
        return err;
    }
}
