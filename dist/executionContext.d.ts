import { Schematic } from './schematics';
import { RequestContext, SharedResource } from './schemas';
import { SyberServer } from './syberServer';
export declare class ExecutionContext {
    req: RequestContext;
    schematic: Schematic;
    private sharedResources;
    private syberServer;
    httpStatus: number;
    correlationId: string;
    errors: any[];
    warnings: any[];
    log: any[];
    raw: any;
    private parameters;
    private wasOneCriticalFailure;
    constructor(req: RequestContext, schematic: Schematic, sharedResources: Array<SharedResource>, syberServer: SyberServer);
    execute(): Promise<any>;
    getParameterValue(name: string): any;
    getSharedResource(name: string): any;
    private runActivities;
    private runProcesses;
    private respond;
    private tryCatchWrapperForProcess;
    private loadParameters;
    private errorResponse;
}
