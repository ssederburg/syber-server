import { ProcessorResponse, ProcessorErrorResponse } from '../schemas';
import { BaseProcessor } from '../processors';
export declare class RawComposer extends BaseProcessor {
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
}
