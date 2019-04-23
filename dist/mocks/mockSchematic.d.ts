import { Schematic } from '../schematics';
import { Parameter } from '../schemas';
export declare class MockSchematic extends Schematic {
    id: string;
    constructor(parameters?: Array<Parameter>);
}
