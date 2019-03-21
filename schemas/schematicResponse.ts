import { BaseProcessor, ProcessorDef, SchemaDef } from '../schemas'
import { ExecutionContext } from '../'

export class SchematicResponse extends ProcessorDef {
    httpStatus: number = 200
    useResolver?: boolean = false
    resolve?(executionContext: ExecutionContext): Promise<typeof BaseProcessor>|typeof BaseProcessor|null {
        return null
    }
    schema?: typeof SchemaDef = null
}
