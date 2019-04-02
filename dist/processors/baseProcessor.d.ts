import { ExecutionContext } from '../executionContext';
import { ProcessorDef, ILogger } from '../schemas';
import { ProcessorResponse, ProcessorErrorResponse } from '../responses';
export declare class BaseProcessor {
    protected executionContext: ExecutionContext;
    protected processorDef: ProcessorDef;
    protected logger: ILogger;
    constructor(executionContext: ExecutionContext, processorDef: ProcessorDef);
    fx(): Promise<ProcessorResponse | ProcessorErrorResponse>;
    protected handleError(err: any, source: any, httpStatus?: any): ProcessorErrorResponse;
}
