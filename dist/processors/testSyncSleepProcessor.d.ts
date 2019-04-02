import { ProcessorResponse, ProcessorErrorResponse } from '../responses';
import { BaseProcessor } from '../processors';
export declare class TestSyncSleepProcessor extends BaseProcessor {
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
}
