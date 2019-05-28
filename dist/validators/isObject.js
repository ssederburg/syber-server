"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function IsObject(value) {
    if (!value) {
        return false;
    }
    return utilities_1.Utilities.isObject(value);
}
exports.IsObject = IsObject;
