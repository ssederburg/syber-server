"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProcessorErrorResponse {
    constructor() {
        this.source = 'unknown';
        this.successful = false;
        this.message = null;
        this.httpStatus = 500;
        this.data = {};
        this.err = {};
    }
}
exports.ProcessorErrorResponse = ProcessorErrorResponse;
