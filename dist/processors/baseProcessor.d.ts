import { ExecutionContext } from '../executionContext';
import { ProcessorDef } from '../schemas';
import { ProcessorResponse, ProcessorErrorResponse } from '../responses';
export declare class BaseProcessor {
    protected executionContext: ExecutionContext;
    protected processorDef: ProcessorDef;
    constructor(executionContext: ExecutionContext, processorDef: ProcessorDef);
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
    protected handleError(err: any, source: any, httpStatus?: any): ProcessorErrorResponse;
}
