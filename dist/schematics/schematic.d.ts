import { Parameter, Activity, SchematicResponse } from '../schemas';
export declare class Schematic {
    id: string;
    description: string;
    parameters?: Array<Parameter>;
    timeout?: number;
    activities: Array<Activity>;
    responses: Array<SchematicResponse>;
    resources?: Array<any>;
}
