import { BaseProcessor, ProcessorDef, SchemaDef } from '../schemas';
import { ExecutionContext } from '../';
export declare class SchematicResponse extends ProcessorDef {
    httpStatus: number;
    useResolver?: boolean;
    resolve?(executionContext: ExecutionContext): Promise<typeof BaseProcessor> | typeof BaseProcessor | null;
    schema?: typeof SchemaDef;
}
