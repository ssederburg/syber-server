"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var GlobalSchematic = (function (_super) {
    __extends(GlobalSchematic, _super);
    function GlobalSchematic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventHandlers = [];
        _this.beforeEachExecution = [];
        _this.afterEachExecution = [];
        _this.tests = [];
        _this.onStartup = [];
        _this.onShutdown = [];
        return _this;
    }
    return GlobalSchematic;
}(_1.Schematic));
exports.GlobalSchematic = GlobalSchematic;
