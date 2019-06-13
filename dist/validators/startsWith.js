"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function StartsWith(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isObject(whatToLookFor) ? Object.assign({}, whatToLookFor) : { value: whatToLookFor, ignoreCase: false };
    if (!whereToLook || !options.value)
        return false;
    if (!utilities_1.Utilities.isString(options.value))
        options.value = options.value.toString();
    if (!utilities_1.Utilities.isString(whereToLook))
        whereToLook = whereToLook.toString();
    if (whereToLook.length < whatToLookFor.length)
        return false;
    if (options.ignoreCase) {
        options.value = options.value.toLowerCase();
        whereToLook = whereToLook.toLowerCase();
    }
    return whereToLook.substr(0, options.value.length) === options.value;
}
exports.StartsWith = StartsWith;
