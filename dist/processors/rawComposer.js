"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
class RawComposer extends schemas_1.BaseProcessor {
    fx(args) {
        const result = new Promise((resolve, reject) => {
            try {
                this.executionContext.raw = Object.assign({}, this.executionContext.raw, args);
                return resolve({
                    successful: true
                });
            }
            catch (err) {
                return reject({
                    successful: false,
                    message: `RawComposer.Error`,
                    data: err
                });
            }
        });
        return result;
    }
}
exports.RawComposer = RawComposer;
