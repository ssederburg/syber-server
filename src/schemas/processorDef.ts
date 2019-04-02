import { BaseProcessor } from '../processors/baseProcessor'

export class ProcessorDef {
    class?: typeof BaseProcessor
    className?: string
    args?: any = {}
    ordinal?: number = 0
    description?: string = null
}
