import { Schematic } from '../schematics'
import { Parameter } from '../schemas'

export class MockSchematic extends Schematic {

    public id: string = 'TEST'

    constructor(parameters?: Array<Parameter>) {
        super()
        if (parameters) {
            this.parameters = [].concat(parameters)
        }
    }

}