"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function IsFloat(value) {
    return utilities_1.Utilities.isNumber && value.toString().indexOf('.') >= 0;
}
exports.IsFloat = IsFloat;
