"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processors_1 = require("../processors");
class ErrorResponse extends processors_1.BaseProcessor {
    fx() {
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
                reject(this.handleError(err, 'ErrorResponse'));
            }
        });
        return result;
    }
}
exports.ErrorResponse = ErrorResponse;
