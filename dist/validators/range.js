"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
var validators_1 = require("../validators");
function Range(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isObject(whatToLookFor) ? Object.assign({}, whatToLookFor) : null;
    if (!options) {
        return false;
    }
    if (!options.max && options.max !== 0) {
        return false;
    }
    if (!options.min && options.min !== 0) {
        return false;
    }
    if (!utilities_1.Utilities.isNumber(options.min) || !utilities_1.Utilities.isNumber(options.max) || !utilities_1.Utilities.isNumber(whereToLook)) {
        return false;
    }
    return validators_1.Min(whereToLook, options.min) && validators_1.Max(whereToLook, options.max);
}
exports.Range = Range;
