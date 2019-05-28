"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function IsNotNullOrEmpty(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isObject(whatToLookFor) ? whatToLookFor : { trim: false, keywordMatch: false };
    if (!whereToLook)
        return false;
    if (!utilities_1.Utilities.isString(whereToLook))
        whereToLook = whereToLook.toString();
    whereToLook = whereToLook.toLowerCase();
    if (options.trim) {
        whereToLook = whereToLook.replace(/\s/g, '');
    }
    if (!whereToLook || whereToLook === '')
        return false;
    if (options.keywordMatch && whereToLook === 'null' || whereToLook === 'undefined') {
        return false;
    }
    return true;
}
exports.IsNotNullOrEmpty = IsNotNullOrEmpty;
