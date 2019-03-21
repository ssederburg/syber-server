"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Activity {
    constructor() {
        this.id = '';
        this.condition = '';
        this.ordinal = 0;
        this.description = null;
        this.executionMode = _1.ExecutionMode.Sequential;
        this.processes = [];
        this.activities = [];
    }
}
exports.Activity = Activity;
