import { BaseProcessor, ProcessorResponse } from '../schemas';
export declare class TestSyncSleepProcessor extends BaseProcessor {
    fx(args?: any): Promise<ProcessorResponse>;
}
