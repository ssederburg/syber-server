"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
class RawResponse extends schemas_1.BaseProcessor {
    fx(args) {
        const result = new Promise((resolve, reject) => {
            try {
                return resolve({
                    successful: true,
                    message: 'OK',
                    data: Object.assign({}, this.executionContext.raw)
                });
            }
            catch (err) {
                reject(err);
            }
        });
        return result;
    }
}
exports.RawResponse = RawResponse;
