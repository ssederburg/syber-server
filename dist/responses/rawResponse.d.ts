import { ProcessorResponse, ProcessorErrorResponse } from '../responses';
import { BaseProcessor } from '../processors';
export declare class RawResponse extends BaseProcessor {
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
}
