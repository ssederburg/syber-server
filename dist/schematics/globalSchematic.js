import { Schematic } from './';
export class GlobalSchematic extends Schematic {
    constructor() {
        super(...arguments);
        this.eventHandlers = [];
        this.beforeEachExecution = [];
        this.afterEachExecution = [];
        this.tests = [];
        this.onStartup = [];
        this.onShutdown = [];
    }
}
