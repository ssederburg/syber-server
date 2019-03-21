import { BaseProcessor, ProcessorResponse } from '../schemas';
export declare class ErrorResponse extends BaseProcessor {
    fx(args: any): Promise<ProcessorResponse>;
}
