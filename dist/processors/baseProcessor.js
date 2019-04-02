import { ProcessorErrorResponse } from '../responses';
var BaseProcessor = (function () {
    function BaseProcessor(executionContext, processorDef) {
        this.executionContext = executionContext;
        this.processorDef = processorDef;
    }
    BaseProcessor.prototype.fx = function () {
        return Promise.resolve({
            successful: false
        });
    };
    BaseProcessor.prototype.handleError = function (err, source, httpStatus) {
        if (!(err instanceof (ProcessorErrorResponse))) {
            var result = new ProcessorErrorResponse();
            result.message = err.message;
            if (httpStatus) {
                result.httpStatus = httpStatus;
            }
            result.err = err;
            result.source = source;
            return result;
        }
        return err;
    };
    return BaseProcessor;
}());
export { BaseProcessor };
