"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
class BaseProcessor {
    constructor(executionContext, processorDef) {
        this.executionContext = executionContext;
        this.processorDef = processorDef;
    }
    fx() {
        return Promise.resolve({
            successful: false
        });
    }
    handleError(err, source, httpStatus) {
        if (!(err instanceof (schemas_1.ProcessorErrorResponse))) {
            const result = new schemas_1.ProcessorErrorResponse();
            result.message = err.message;
            if (httpStatus) {
                result.httpStatus = httpStatus;
            }
            result.err = err;
            result.source = source;
            return result;
        }
        return err;
    }
}
exports.BaseProcessor = BaseProcessor;
