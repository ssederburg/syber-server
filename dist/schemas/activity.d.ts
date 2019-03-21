import { ProcessorDef, ExecutionMode } from './';
export declare class Activity {
    id: string;
    condition?: string;
    ordinal: number;
    description?: string;
    executionMode?: ExecutionMode;
    processes?: Array<ProcessorDef>;
    activities?: Array<Activity>;
}
