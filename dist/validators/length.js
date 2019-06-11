"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function Length(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isObject(whatToLookFor) ? whatToLookFor : { length: whatToLookFor };
    if (!whatToLookFor)
        return false;
    if (!whereToLook && whereToLook !== '')
        return false;
    if (!utilities_1.Utilities.isString(whereToLook))
        whereToLook = whereToLook.toString();
    if (options.length === 0) {
        return whereToLook.length === 0;
    }
    if (options.length > 0) {
        return whereToLook.length === options.length;
    }
    if (!options.min) {
        options.min = 0;
    }
    if (!options.max) {
        options.max = Number.MAX_VALUE;
    }
    if (options.min > options.max)
        return false;
    return whereToLook.length >= options.min && whereToLook.length <= options.max;
}
exports.Length = Length;
