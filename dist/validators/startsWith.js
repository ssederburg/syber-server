"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("../utilities/utilities");
function StartsWith(text, value) {
    if (!utilities_1.Utilities.isString(value))
        return false;
    return value.indexOf(text) === 0;
}
exports.StartsWith = StartsWith;
