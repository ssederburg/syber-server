import { ProcessorDef } from '../schemas';
export class SchematicResponse extends ProcessorDef {
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
