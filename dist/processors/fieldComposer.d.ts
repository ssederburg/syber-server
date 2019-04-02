import { ProcessorResponse, ProcessorErrorResponse } from '../responses';
import { BaseProcessor } from '../processors';
export declare class FieldComposer extends BaseProcessor {
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
}
