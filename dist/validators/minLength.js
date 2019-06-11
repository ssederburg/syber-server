"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function MinLength(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isObject(whatToLookFor) ? whatToLookFor : { min: whatToLookFor };
    if (!whereToLook && whereToLook !== '' || !options.min && options.min !== 0) {
        return false;
    }
    if (!utilities_1.Utilities.isString(whereToLook))
        whereToLook = whereToLook.toString();
    if (!utilities_1.Utilities.isNumber(options.min))
        return false;
    return whereToLook.length >= options.min;
}
exports.MinLength = MinLength;
