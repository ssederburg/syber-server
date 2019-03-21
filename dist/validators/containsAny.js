"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("../utilities/utilities");
function ContainsAny(input, value) {
    if (!utilities_1.Utilities.isArray(input))
        return false;
    let wasOne = false;
    input.forEach((item) => {
        if (!wasOne && value.indexOf(item) >= 0) {
            wasOne = true;
        }
    });
    return wasOne;
}
exports.ContainsAny = ContainsAny;
