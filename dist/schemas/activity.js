import { ExecutionMode } from './';
var Activity = (function () {
    function Activity() {
        this.id = '';
        this.condition = '';
        this.ordinal = 0;
        this.description = null;
        this.executionMode = ExecutionMode.Sequential;
        this.processes = [];
        this.activities = [];
    }
    return Activity;
}());
export { Activity };
