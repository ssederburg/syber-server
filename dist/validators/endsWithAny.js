"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function EndsWithAny(text, value) {
    if (!utilities_1.Utilities.isString(value))
        value = value.toString();
    var wasOne = false;
    text.forEach(function (item) {
        if (!wasOne && value.indexOf(item) === value.length - item.length)
            wasOne = true;
    });
    return wasOne;
}
exports.EndsWithAny = EndsWithAny;
