import { Schematic } from './'
import { Activity } from '../schemas'

export class GlobalSchematic extends Schematic {

    eventHandlers: Array<any> = []
    
    beforeEachExecution: Array<Activity> = []
    afterEachExecution: Array<Activity> = []
    
    tests: Array<Activity> = []
    
    onStartup: Array<Activity> = []
    onShutdown: Array<Activity> = []
    
}
