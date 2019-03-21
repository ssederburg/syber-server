import { BaseProcessor, ProcessorResponse } from '../schemas';
export declare class RawResponse extends BaseProcessor {
    fx(args: any): Promise<ProcessorResponse>;
}
