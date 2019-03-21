"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processors_1 = require("../processors");
class RawResponse extends processors_1.BaseProcessor {
    fx() {
        const result = new Promise((resolve, reject) => {
            try {
                return resolve({
                    successful: true,
                    message: 'OK',
                    data: Object.assign({}, this.executionContext.raw)
                });
            }
            catch (err) {
                reject(this.handleError(err, 'RawResponse'));
            }
        });
        return result;
    }
}
exports.RawResponse = RawResponse;
