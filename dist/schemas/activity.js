import { ExecutionMode } from './';
export class Activity {
    constructor() {
        this.id = '';
        this.condition = '';
        this.ordinal = 0;
        this.description = null;
        this.executionMode = ExecutionMode.Sequential;
        this.processes = [];
        this.activities = [];
    }
}
