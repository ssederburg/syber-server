"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("../utilities/utilities");
function StartsWithAny(text, value) {
    if (!utilities_1.Utilities.isString(value))
        value = value.toString();
    let wasOne = false;
    text.forEach((item) => {
        if (!wasOne && value.indexOf(item) === 0)
            wasOne = true;
    });
    return wasOne;
}
exports.StartsWithAny = StartsWithAny;
