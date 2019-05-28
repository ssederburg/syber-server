"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
var validators_1 = require("../validators");
function Range(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isObject(whatToLookFor) ? whatToLookFor : null;
    if (!options || !options.max || !options.min) {
        return false;
    }
    if (!utilities_1.Utilities.isNumber(options.min) || !utilities_1.Utilities.isNumber(options.max) || !utilities_1.Utilities.isNumber(whereToLook)) {
        return false;
    }
    return validators_1.Min(whereToLook, options.min) && validators_1.Max(whereToLook, options.max);
}
exports.Range = Range;
