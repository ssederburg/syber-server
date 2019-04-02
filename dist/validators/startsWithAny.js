"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function StartsWithAny(text, value) {
    if (!utilities_1.Utilities.isString(value))
        value = value.toString();
    var wasOne = false;
    text.forEach(function (item) {
        if (!wasOne && value.indexOf(item) === 0)
            wasOne = true;
    });
    return wasOne;
}
exports.StartsWithAny = StartsWithAny;
