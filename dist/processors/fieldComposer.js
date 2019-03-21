"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processors_1 = require("../processors");
class FieldComposer extends processors_1.BaseProcessor {
    fx() {
        const result = new Promise((resolve, reject) => {
            try {
                const output = {};
                if (!this.executionContext.schematic.parameters || this.executionContext.schematic.parameters.length <= 0) {
                    return resolve({
                        successful: false,
                        message: `No parameters listed in schematic`
                    });
                }
                this.executionContext.schematic.parameters.forEach((parameter) => {
                    output[parameter.name] = this.executionContext.getParameterValue(parameter.name);
                });
                this.executionContext.raw = Object.assign({}, output);
                return resolve({
                    successful: true
                });
            }
            catch (err) {
                return reject(this.handleError(err, 'FieldComposer'));
            }
        });
        return result;
    }
}
exports.FieldComposer = FieldComposer;
