"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validators = require("../validators");
var lodash_1 = require("lodash");
var RuleEngineHelper = (function () {
    function RuleEngineHelper(logger) {
        this.logger = logger;
        this._functions = [];
    }
    RuleEngineHelper.prototype.getRuleFunction = function (className) {
        var result = lodash_1.find(this._functions, { className: className });
        if (!result) {
            this.logger.warn("SYSTEM", "No record of rule " + className, "RuleEngineHelper.getRuleFunction()");
            return this.noop;
        }
        return result.fx;
    };
    RuleEngineHelper.prototype.loadDefaultRuleFunctions = function () {
        this.registerRuleFunction('Contains', Validators.Contains);
        this.registerRuleFunction('ContainsAny', Validators.ContainsAny);
        this.registerRuleFunction('DateRange', Validators.DateRange);
        this.registerRuleFunction('EndsWith', Validators.EndsWith);
        this.registerRuleFunction('EndsWithAny', Validators.EndsWithAny);
        this.registerRuleFunction('Equals', Validators.Equals);
        this.registerRuleFunction('EqualsAny', Validators.EqualsAny);
        this.registerRuleFunction('IsArray', Validators.IsArray);
        this.registerRuleFunction('IsDate', Validators.IsDate);
        this.registerRuleFunction('IsFloat', Validators.IsFloat);
        this.registerRuleFunction('IsNotNullOrEmpty', Validators.IsNotNullOrEmpty);
        this.registerRuleFunction('IsNullOrEmpty', Validators.IsNullOrEmpty);
        this.registerRuleFunction('IsNumber', Validators.IsNumber);
        this.registerRuleFunction('IsObject', Validators.IsObject);
        this.registerRuleFunction('IsString', Validators.IsString);
        this.registerRuleFunction('Length', Validators.Length);
        this.registerRuleFunction('Max', Validators.Max);
        this.registerRuleFunction('MaxDate', Validators.MaxDate);
        this.registerRuleFunction('MaxLength', Validators.MaxLength);
        this.registerRuleFunction('Min', Validators.Min);
        this.registerRuleFunction('MinDate', Validators.MinDate);
        this.registerRuleFunction('MinLength', Validators.MinLength);
        this.registerRuleFunction('Range', Validators.Range);
        this.registerRuleFunction('RegEx', Validators.RegEx);
        this.registerRuleFunction('StartsWith', Validators.StartsWith);
        this.registerRuleFunction('StartsWithAny', Validators.StartsWithAny);
    };
    RuleEngineHelper.prototype.registerRuleFunction = function (className, fx) {
        var result = lodash_1.find(this._functions, { className: className });
        if (result) {
            this.logger.warn("SYSTEM", "Attempted to reregister Rule Function " + className, "RuleEngineHelper.registerRuleFunction()");
            return;
        }
        this._functions.push({
            className: className,
            fx: fx
        });
    };
    RuleEngineHelper.prototype.noop = function () {
        return {
            pass: false,
            note: 'Invalid Rule className or arguments'
        };
    };
    return RuleEngineHelper;
}());
exports.RuleEngineHelper = RuleEngineHelper;
