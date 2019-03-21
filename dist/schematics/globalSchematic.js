"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class GlobalSchematic extends _1.Schematic {
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
exports.GlobalSchematic = GlobalSchematic;
