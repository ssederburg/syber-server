"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseProcessor {
    constructor(executionContext, processorDef) {
        this.executionContext = executionContext;
        this.processorDef = processorDef;
    }
    fx(args) {
        return Promise.resolve({
            successful: false
        });
    }
}
exports.BaseProcessor = BaseProcessor;
