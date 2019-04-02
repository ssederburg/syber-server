"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function MaxDate(maxDate, value) {
    if (!utilities_1.Utilities.isDate(value))
        return false;
    return value <= new Date(maxDate);
}
exports.MaxDate = MaxDate;
