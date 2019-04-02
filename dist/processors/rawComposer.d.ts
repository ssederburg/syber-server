import { ProcessorResponse, ProcessorErrorResponse } from '../responses';
import { BaseProcessor } from '../processors';
export declare class RawComposer extends BaseProcessor {
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
}
