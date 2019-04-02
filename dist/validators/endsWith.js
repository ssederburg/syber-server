"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function EndsWith(text, value) {
    if (!utilities_1.Utilities.isString(value))
        return false;
    return value.indexOf(text) === value.length - text.length;
}
exports.EndsWith = EndsWith;
