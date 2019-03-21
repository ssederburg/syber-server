"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
class SchematicResponse extends schemas_1.ProcessorDef {
    constructor() {
        super(...arguments);
        this.httpStatus = 200;
        this.useResolver = false;
        this.schema = null;
    }
    resolve(executionContext) {
        return null;
    }
}
exports.SchematicResponse = SchematicResponse;
