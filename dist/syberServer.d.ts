import { RouteOptions } from './routes';
import { GlobalSchematic } from './schematics';
import { SyberServerOptions } from './syberServerOptions';
import { RequestContext, SchematicResponse, ILogger } from './schemas';
export declare class SyberServer {
    private options;
    private isStarted;
    private shuttingDown;
    private globalSchematic;
    private sharedResources;
    logger: ILogger;
    events: any;
    express: any;
    constructor(options: SyberServerOptions);
    registerGlobalSchematic(schematic: typeof GlobalSchematic, sharedResources?: Array<any>): void;
    registerHandler(verb: string, path: string, handler: any): void;
    registerRoute(options: RouteOptions): void;
    start(): void;
    shutdown(withError?: boolean): void;
    getGlobalSchematicResponse(httpStatus: number): SchematicResponse;
    throwGlobalSchematicError(req: RequestContext, httpStatus: number, errText: string): Promise<any>;
}
