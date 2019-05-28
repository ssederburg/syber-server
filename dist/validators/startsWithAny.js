"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function StartsWithAny(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isArray(whatToLookFor) ? { value: whatToLookFor, ignoreCase: false } : Object.assign({}, whatToLookFor);
    if (!whereToLook || !options || !options.value || !utilities_1.Utilities.isArray(options.value)) {
        return false;
    }
    if (!utilities_1.Utilities.isString(whereToLook))
        whereToLook = whereToLook.toString();
    if (options.ignoreCase) {
        whereToLook = whereToLook.toLowerCase();
    }
    var wasOne = false;
    options.value.forEach(function (item) {
        if (options.ignoreCase) {
            item = item.toLowerCase();
        }
        if (!wasOne && whereToLook.substr(0, item.length) === item) {
            wasOne = true;
            return true;
        }
    });
    return wasOne;
}
exports.StartsWithAny = StartsWithAny;
