import { ProcessorResponse, ProcessorErrorResponse } from '../schemas';
import { BaseProcessor } from '../processors';
export declare class TestAsyncSleepProcessor extends BaseProcessor {
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
    private runAsync;
}
