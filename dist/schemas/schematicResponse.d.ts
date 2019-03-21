import { ProcessorDef, SchemaDef } from '../schemas';
import { ExecutionContext } from '../';
import { BaseProcessor } from '../processors';
export declare class SchematicResponse extends ProcessorDef {
    httpStatus: number;
    useResolver?: boolean;
    resolve?(executionContext: ExecutionContext): Promise<typeof BaseProcessor> | typeof BaseProcessor | null;
    schema?: typeof SchemaDef;
}
