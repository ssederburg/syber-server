import { Schematic } from './schematics';
import { RequestContext, SharedResource } from './schemas';
import { IMockSyberServer } from './mocks';
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
    document: any;
    private parameters;
    private wasOneCriticalFailure;
    private logger;
    constructor(req: RequestContext, schematic: Schematic, sharedResources: Array<SharedResource>, syberServer: SyberServer | IMockSyberServer);
    execute(): Promise<any>;
    setupForTesting(): Promise<any>;
    getParameterValue(name: string): any;
    getSharedResource(name: string): any;
    private runActivities;
    private runProcesses;
    private respond;
    private tryCatchWrapperForProcess;
    private loadParameters;
    private errorResponse;
}
