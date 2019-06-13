"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function MaxLength(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isObject(whatToLookFor) ? Object.assign({}, whatToLookFor) : { max: whatToLookFor };
    if (!whereToLook && whereToLook !== '' || !options.max && options.max !== 0) {
        return false;
    }
    if (!utilities_1.Utilities.isString(whereToLook))
        whereToLook = whereToLook.toString();
    if (!utilities_1.Utilities.isNumber(options.max))
        return false;
    return whereToLook.length <= options.max;
}
exports.MaxLength = MaxLength;
