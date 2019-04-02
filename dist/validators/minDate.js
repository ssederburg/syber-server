"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function MinDate(minDate, value) {
    if (!utilities_1.Utilities.isDate(value))
        return false;
    return value >= new Date(minDate);
}
exports.MinDate = MinDate;
