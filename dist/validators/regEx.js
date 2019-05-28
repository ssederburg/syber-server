"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function RegEx(whereToLook, whatToLookFor) {
    if (!whereToLook || !whatToLookFor) {
        return false;
    }
    if (!utilities_1.Utilities.isString(whereToLook))
        whereToLook = whereToLook.toString();
    var regexp = new RegExp(whatToLookFor);
    return regexp.test(whereToLook);
}
exports.RegEx = RegEx;
