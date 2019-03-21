"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
class ErrorResponse extends schemas_1.BaseProcessor {
    fx(args) {
        const result = new Promise((resolve, reject) => {
            try {
                return resolve({
                    successful: false,
                    message: 'ERROR',
                    data: Object.assign({}, {
                        httpStatus: this.executionContext.httpStatus,
                        errors: this.executionContext.errors,
                        warnings: this.executionContext.warnings,
                        origin: `ErrorResponse.Resolve`
                    })
                });
            }
            catch (err) {
                reject({
                    successful: false,
                    message: 'ERROR',
                    data: Object.assign({}, {
                        httpStatus: this.executionContext.httpStatus || 500,
                        errors: this.executionContext.errors || ['Unknown Error'],
                        warnings: this.executionContext.warnings || [],
                        origin: `ErrorResponse.Reject`
                    })
                });
            }
        });
        return result;
    }
}
exports.ErrorResponse = ErrorResponse;
