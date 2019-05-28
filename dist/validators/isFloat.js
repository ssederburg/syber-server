"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function IsFloat(value) {
    if (value === null || value === undefined)
        return false;
    if (utilities_1.Utilities.isNumber(value) && !isNaN(parseFloat(value)) && value.indexOf('.') >= 0) {
        return true;
    }
    return false;
}
exports.IsFloat = IsFloat;
