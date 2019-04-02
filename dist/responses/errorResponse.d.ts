import { ProcessorResponse, ProcessorErrorResponse } from './';
import { BaseProcessor } from '../processors';
export declare class ErrorResponse extends BaseProcessor {
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
}
