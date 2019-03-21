import { ExecutionContext } from "../executionContext";
import { ProcessorDef, ProcessorResponse } from "./";
export declare class BaseProcessor {
    protected executionContext: ExecutionContext;
    protected processorDef: ProcessorDef;
    constructor(executionContext: ExecutionContext, processorDef: ProcessorDef);
    fx(args: any): Promise<ProcessorResponse>;
}
