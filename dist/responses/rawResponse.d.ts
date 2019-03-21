import { ProcessorResponse, ProcessorErrorResponse } from '../schemas';
import { BaseProcessor } from '../processors';
export declare class RawResponse extends BaseProcessor {
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
}
