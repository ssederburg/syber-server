import { ProcessorResponse, ProcessorErrorResponse } from '../responses';
import { BaseProcessor } from '../processors';
export declare class TestAsyncSleepProcessor extends BaseProcessor {
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
    private runAsync;
}
