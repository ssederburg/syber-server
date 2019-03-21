"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processors_1 = require("../processors");
class RawComposer extends processors_1.BaseProcessor {
    fx() {
        const result = new Promise((resolve, reject) => {
            try {
                this.executionContext.raw = Object.assign({}, this.executionContext.raw, this.processorDef.args);
                return resolve({
                    successful: true
                });
            }
            catch (err) {
                return reject(this.handleError(err, 'RawComposer'));
            }
        });
        return result;
    }
}
exports.RawComposer = RawComposer;
