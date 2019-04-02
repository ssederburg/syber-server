"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var responses_1 = require("../responses");
var BaseProcessor = (function () {
    function BaseProcessor(executionContext, processorDef) {
        this.executionContext = executionContext;
        this.processorDef = processorDef;
        this.logger = null;
    }
    BaseProcessor.prototype.fx = function () {
        return Promise.resolve({
            successful: false
        });
    };
    BaseProcessor.prototype.handleError = function (err, source, httpStatus) {
        if (!(err instanceof (responses_1.ProcessorErrorResponse))) {
            var result = new responses_1.ProcessorErrorResponse();
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
    };
    return BaseProcessor;
}());
exports.BaseProcessor = BaseProcessor;
