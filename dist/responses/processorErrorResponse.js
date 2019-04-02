"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessorErrorResponse = (function () {
    function ProcessorErrorResponse() {
        this.source = 'unknown';
        this.successful = false;
        this.message = null;
        this.httpStatus = 500;
        this.data = {};
        this.err = {};
    }
    return ProcessorErrorResponse;
}());
exports.ProcessorErrorResponse = ProcessorErrorResponse;
