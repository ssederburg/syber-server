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
var baseProcessor_1 = require("./baseProcessor");
var utilities_1 = require("../utilities");
var lodash_1 = require("lodash");
var RuleProcessor = (function (_super) {
    __extends(RuleProcessor, _super);
    function RuleProcessor(executionContext, processDef, logger) {
        var _this = _super.call(this, executionContext, processDef, logger) || this;
        _this.executionContext = executionContext;
        _this.processDef = processDef;
        _this.logger = logger;
        _this._canWork = true;
        _this.ruleEngineHelper = null;
        if (!executionContext.getSharedResource('RuleEngineHelper')) {
            logger.error(executionContext.correlationId, "Attempted to run a rule processor without assigning RuleEngineHelper as a shared resource.", "RuleProcessor.Ctor");
            _this._canWork = false;
            return _this;
        }
        _this.ruleEngineHelper = executionContext.getSharedResource('RuleEngineHelper');
        return _this;
    }
    RuleProcessor.prototype.fx = function () {
        throw new Error('Not implemented on Base Class RuleProcessor. Must override method fx and call base method getRuleResult.');
    };
    RuleProcessor.prototype.getRuleResult = function (value, ruleset) {
        var _this = this;
        if (!this._canWork) {
            this.logger.error(this.executionContext.correlationId, "Cannot getRuleResult because no sharedResource named 'RuleEngineHelper is available on this execution context.", "RuleProcessor.getRuleResult()");
            return Promise.reject({
                successful: false
            });
        }
        if (!ruleset || !ruleset.rules || ruleset.rules.length <= 0) {
            return Promise.resolve({
                successful: true
            });
        }
        if (utilities_1.Utilities.isNullOrUndefined(value)) {
            return Promise.resolve({
                successful: ruleset.required ? false : true
            });
        }
        if (ruleset.dataType) {
            if (!utilities_1.Utilities.isDataType(value, ruleset.dataType)) {
                return Promise.resolve({
                    successful: false
                });
            }
        }
        return new Promise(function (resolve, reject) {
            try {
                if (!ruleset.groups || ruleset.groups.length === 0) {
                    ruleset.groups = [];
                    ruleset.groups.push({
                        id: 'A',
                        ordinal: 0,
                        conjunction: 'and',
                        result: false,
                        notes: []
                    });
                    ruleset.rules.forEach(function (rule) {
                        rule.group = 'A';
                    });
                }
                var sortedGroups = lodash_1.sortBy(ruleset.groups, 'ordinal');
                var allNotes_1 = [];
                sortedGroups.forEach(function (group) {
                    var groupRules = lodash_1.filter(ruleset.rules, { group: group.id });
                    _this.processRuleGroup(value, group, groupRules);
                    allNotes_1.push(group.notes);
                });
                if (sortedGroups.length === 1) {
                    return resolve({
                        successful: sortedGroups[0].result,
                        data: [].concat.apply([], allNotes_1)
                    });
                }
                var orGroups = lodash_1.filter(sortedGroups, { conjunction: 'or' });
                if (orGroups && orGroups.length > 0) {
                    orGroups.forEach(function (group) {
                        if (group.result) {
                            return resolve({
                                successful: true,
                                data: [].concat.apply([], allNotes_1)
                            });
                        }
                    });
                }
                var andGroups = lodash_1.filter(sortedGroups, { conjunction: 'and' });
                var isFailure_1 = true;
                if (andGroups && andGroups.length > 0) {
                    isFailure_1 = false;
                    andGroups.forEach(function (group) {
                        if (!group.result) {
                            isFailure_1 = true;
                        }
                    });
                }
                return resolve({
                    successful: !isFailure_1,
                    data: [].concat.apply([], allNotes_1)
                });
            }
            catch (err) {
                return reject(_this.handleError(err, "RuleProcessor.getRuleResult"));
            }
        });
    };
    RuleProcessor.prototype.processRuleGroup = function (value, group, rules) {
        var _this = this;
        var sortedRules = lodash_1.sortBy(rules, 'ordinal');
        var andFailure = false;
        var orSuccess = false;
        sortedRules.forEach(function (rule) {
            if (!rule.conjunction) {
                rule.conjunction = 'and';
            }
            var ruleResponse = _this.processRule(value, rule);
            rule.result = ruleResponse.pass;
            if (!ruleResponse || !ruleResponse.pass && rule.conjunction === 'and') {
                andFailure = true;
            }
            if (ruleResponse && ruleResponse.pass && rule.conjunction === 'or') {
                orSuccess = true;
            }
            if (ruleResponse.note) {
                group.notes.push(ruleResponse.note);
            }
        });
        group.result = !andFailure || orSuccess;
        return {
            pass: group.result,
            notes: [].concat.apply([], group.notes),
            groupConjunction: group.conjunction
        };
    };
    RuleProcessor.prototype.processRule = function (value, rule) {
        var ruleFunction = this.ruleEngineHelper.getRuleFunction(rule.className);
        if (!ruleFunction) {
            return {
                pass: false,
                note: "Unable to locate RuleFunction " + rule.className
            };
        }
        if (!rule.shouldBe) {
            rule.shouldBe = true;
        }
        var convertedValue = value;
        switch (rule.dataType) {
            case 'string':
                convertedValue = value.toString();
                break;
            case 'number':
                convertedValue = utilities_1.Utilities.toInt(value);
                break;
            case 'decimal':
            case 'float':
                convertedValue = utilities_1.Utilities.toFloat(value);
            case 'date':
                convertedValue = utilities_1.Utilities.toDate(value);
            case 'boolean':
            case 'bool':
                convertedValue = utilities_1.Utilities.toBoolean(value);
            default:
                convertedValue = value;
        }
        var result = ruleFunction(convertedValue, rule.args);
        var didPass = result === rule.shouldBe;
        return {
            pass: didPass,
            note: !didPass ? rule.note : null
        };
    };
    return RuleProcessor;
}(baseProcessor_1.BaseProcessor));
exports.RuleProcessor = RuleProcessor;
