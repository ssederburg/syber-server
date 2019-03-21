import { ProcessorResponse, ProcessorErrorResponse } from '../schemas';
import { BaseProcessor } from '../processors';
export declare class TestSyncSleepProcessor extends BaseProcessor {
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
}
