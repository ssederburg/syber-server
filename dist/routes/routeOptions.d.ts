import { Schematic } from '../schematics';
import { RequestContext } from '../schemas';
export declare class RouteOptions {
    verb: string;
    path: string;
    schematic?: typeof Schematic;
    contentType?: string;
    useResolver?: boolean;
    sharedResources?: Array<any>;
    resolve?(req: RequestContext): Promise<typeof Schematic> | typeof Schematic | null;
}
