import { BaseProcessor } from '../processors/baseProcessor';
export declare class ProcessorDef {
    class?: typeof BaseProcessor;
    className?: string;
    args?: any;
    ordinal?: number;
    description?: string;
}
