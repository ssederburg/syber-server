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
var processors_1 = require("../processors");
var MockRuleProcessor = (function (_super) {
    __extends(MockRuleProcessor, _super);
    function MockRuleProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockRuleProcessor.prototype.mockFx = function (value, ruleset) {
        return _super.prototype.getRuleResult.call(this, value, ruleset);
    };
    return MockRuleProcessor;
}(processors_1.RuleProcessor));
exports.MockRuleProcessor = MockRuleProcessor;
