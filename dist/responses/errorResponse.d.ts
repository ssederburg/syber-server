import { ProcessorResponse, ProcessorErrorResponse } from '../schemas';
import { BaseProcessor } from '../processors';
export declare class ErrorResponse extends BaseProcessor {
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
}
