"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function Equals(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isObject(whatToLookFor) ? Object.assign({}, whatToLookFor) : { value: whatToLookFor, ignoreCase: false, trim: false };
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
    if (options.trim) {
        options.value = options.value.replace(/\s/g, '');
        whereToLook = whereToLook.replace(/\s/g, '');
    }
    return whereToLook === options.value;
}
exports.Equals = Equals;
