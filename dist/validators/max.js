"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function Max(whereToLook, whatToLookFor) {
    if (!whereToLook && whereToLook !== 0) {
        return false;
    }
    if (!whatToLookFor && whatToLookFor !== 0) {
        return false;
    }
    if (!utilities_1.Utilities.isNumber(whereToLook))
        return false;
    if (!utilities_1.Utilities.isNumber(whatToLookFor))
        return false;
    var whereToLookNumber = Number(whereToLook);
    var whatToLookForNumber = Number(whatToLookFor);
    return whereToLookNumber <= whatToLookForNumber;
}
exports.Max = Max;
