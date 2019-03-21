import { ProcessorResponse, ProcessorErrorResponse } from '../schemas';
import { BaseProcessor } from '../processors';
export declare class FieldComposer extends BaseProcessor {
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
}
