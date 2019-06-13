"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function Contains(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isObject(whatToLookFor) ? Object.assign({}, whatToLookFor) : { value: whatToLookFor, ignoreCase: false };
    if (!whereToLook || !options.value)
        return false;
    if (!utilities_1.Utilities.isString(options.value))
        options.value = options.value.toString();
    if (!utilities_1.Utilities.isString(whereToLook))
        whereToLook = whereToLook.toString();
    if (options.ignoreCase) {
        options.value = options.value.toLowerCase();
        whereToLook = whereToLook.toLowerCase();
    }
    return whereToLook.indexOf(options.value) >= 0;
}
exports.Contains = Contains;
