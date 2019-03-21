"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProcessorResponse {
    constructor() {
        this.successful = true;
        this.message = null;
        this.httpStatus = 200;
        this.data = {};
    }
}
exports.ProcessorResponse = ProcessorResponse;
