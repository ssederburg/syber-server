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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    RuleProcessor.prototype.processRuleExecutionObject = function (ObjectOfValues, policies) {
        if (!ObjectOfValues || Object.getOwnPropertyNames(ObjectOfValues).length <= 0 || !policies || policies.length <= 0) {
            return Promise.resolve({
                pass: false,
                notes: ["Invalid ObjectOfValues parameter or policy list"],
                results: []
            });
        }
        var documentOfValues = [];
        var keys = Object.getOwnPropertyNames(ObjectOfValues);
        keys.forEach(function (key) {
            documentOfValues.push({
                key: key,
                value: ObjectOfValues[key] || ''
            });
        });
        return this.processRuleExecutionDocument(documentOfValues, policies);
    };
    RuleProcessor.prototype.processRuleExecutionDocument = function (documentOfValues, policies) {
        var _this = this;
        var allNotes = [];
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var functionsToExecute_1, finalResult, didAllPass_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!documentOfValues || documentOfValues.length <= 0 || !policies || policies.length <= 0) {
                            return [2, reject({
                                    pass: false,
                                    notes: ["Invalid document of values or policy list"],
                                    results: []
                                })];
                        }
                        functionsToExecute_1 = [];
                        documentOfValues.forEach(function (datarow) {
                            var ruleContainer = lodash_1.find(policies, { name: datarow.key });
                            if (!ruleContainer) {
                                allNotes.push(datarow.key + ": No rule with that name exists in policies");
                            }
                            else {
                                functionsToExecute_1.push(_this.getRuleResult(datarow.value, ruleContainer));
                            }
                        });
                        if (!(functionsToExecute_1 && functionsToExecute_1.length > 0)) return [3, 2];
                        return [4, Promise.all(functionsToExecute_1)];
                    case 1:
                        finalResult = _a.sent();
                        didAllPass_1 = true;
                        finalResult.forEach(function (result) {
                            allNotes = allNotes.concat(result.notes);
                            if (!result.pass) {
                                didAllPass_1 = false;
                            }
                        });
                        return [2, resolve({
                                pass: didAllPass_1,
                                notes: [].concat(allNotes),
                                results: [].concat(finalResult)
                            })];
                    case 2: return [2, resolve({
                            pass: false,
                            notes: ["No rule functions loaded to be executed"].concat(allNotes),
                            results: []
                        })];
                    case 3: return [3, 5];
                    case 4:
                        err_1 = _a.sent();
                        return [2, reject({
                                pass: false,
                                notes: [].concat(allNotes).concat(err_1.message),
                                results: []
                            })];
                    case 5: return [2];
                }
            });
        }); });
    };
    RuleProcessor.prototype.getRuleResult = function (value, ruleset) {
        var _this = this;
        if (!this._canWork) {
            this.logger.error(this.executionContext.correlationId, "Cannot getRuleResult because no sharedResource named 'RuleEngineHelper is available on this execution context.", "RuleProcessor.getRuleResult()");
            return Promise.reject({
                pass: false,
                notes: ["Cannot getRuleResult because no sharedResource named 'RuleEngineHelper is available on this execution context."],
                name: ruleset.name,
                ruleCount: ruleset.rules ? ruleset.rules.length : 0,
                groupCount: ruleset.groups ? ruleset.groups.length : 0
            });
        }
        if (!ruleset || !ruleset.rules || ruleset.rules.length <= 0) {
            return Promise.resolve({
                pass: false,
                notes: ["Invalid ruleset"],
                name: ruleset && ruleset.name ? ruleset.name : 'unknown',
                ruleCount: 0,
                groupCount: 0
            });
        }
        return new Promise(function (resolve, reject) {
            try {
                var getOutOfJailFree = false;
                if (utilities_1.Utilities.isNullOrUndefined(value) && !ruleset.required) {
                    getOutOfJailFree = true;
                }
                if (value === '' && !ruleset.required) {
                    getOutOfJailFree = true;
                }
                if (ruleset.dataType) {
                    if (!utilities_1.Utilities.isDataType(value, ruleset.dataType)) {
                        return resolve({
                            pass: false,
                            notes: [ruleset.name + ": Value " + value + " is not data type " + ruleset.dataType].concat(ruleset.note ? ruleset.note : null),
                            name: ruleset.name,
                            ruleCount: ruleset.rules.length,
                            groupCount: ruleset.groups ? ruleset.groups.length : 0
                        });
                    }
                }
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
                    if (!group.conjunction) {
                        group.conjunction = 'and';
                    }
                    if (!group.notes) {
                        group.notes = [];
                    }
                    var groupRules = lodash_1.filter(ruleset.rules, { group: group.id });
                    _this.processRuleGroup(value, group, groupRules, ruleset.name);
                    allNotes_1.push(group.notes);
                });
                if (sortedGroups.length === 1) {
                    if (!sortedGroups[0].result && ruleset.note) {
                        allNotes_1.push(ruleset.note);
                    }
                    return resolve({
                        pass: getOutOfJailFree ? true : sortedGroups[0].result,
                        notes: [].concat.apply([], allNotes_1),
                        name: ruleset.name,
                        ruleCount: ruleset.rules.length,
                        groupCount: 1
                    });
                }
                var orGroups = lodash_1.filter(sortedGroups, { conjunction: 'or' });
                if (orGroups && orGroups.length > 0) {
                    orGroups.forEach(function (group) {
                        if (group.result) {
                            return resolve({
                                pass: true,
                                notes: [].concat.apply([], allNotes_1),
                                name: ruleset.name,
                                ruleCount: ruleset.rules.length,
                                groupCount: ruleset.groups.length
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
                if (isFailure_1 && ruleset.note) {
                    allNotes_1.push(ruleset.note);
                }
                return resolve({
                    pass: getOutOfJailFree ? true : !isFailure_1,
                    notes: [].concat.apply([], allNotes_1),
                    name: ruleset.name,
                    ruleCount: ruleset.rules.length,
                    groupCount: ruleset.groups.length
                });
            }
            catch (err) {
                return reject({
                    pass: false,
                    notes: [].concat["Error Executing Ruleset " + ruleset.name + ": " + err.message],
                    name: ruleset.name,
                    ruleCount: ruleset.rules.length,
                    groupCount: ruleset.groups.length
                });
            }
        });
    };
    RuleProcessor.prototype.processRuleGroup = function (value, group, rules, ruleName) {
        var _this = this;
        var sortedRules = lodash_1.sortBy(rules, 'ordinal');
        var andFailure = false;
        var orSuccess = false;
        sortedRules.forEach(function (rule) {
            if (!rule.conjunction) {
                rule.conjunction = 'and';
            }
            var ruleResponse = _this.processRule(value, rule, ruleName);
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
    RuleProcessor.prototype.processRule = function (value, rule, ruleName) {
        var ruleFunction = this.ruleEngineHelper.getRuleFunction(rule.className);
        if (!ruleFunction) {
            return {
                pass: false,
                note: "Unable to locate RuleFunction " + rule.className
            };
        }
        var convertedValue = utilities_1.Utilities.toDataType(value, rule.dataType);
        var result = ruleFunction(convertedValue, rule.args);
        var didPass = result === !rule.expectFalse;
        return {
            pass: didPass,
            note: !didPass && rule.note ? ruleName + ": " + rule.note : null
        };
    };
    return RuleProcessor;
}(baseProcessor_1.BaseProcessor));
exports.RuleProcessor = RuleProcessor;
