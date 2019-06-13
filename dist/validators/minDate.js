"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function MinDate(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isObject(whatToLookFor) ? Object.assign({}, whatToLookFor) : { min: whatToLookFor, minFormat: 'YYYY-MM-DD', sourceFormat: 'YYYY-MM-DD' };
    whereToLook = utilities_1.Utilities.parseDateInput(whereToLook, options.sourceFormat || 'YYYY-MM-DD');
    options.min = utilities_1.Utilities.parseDateInput(options.min, options.minFormat || 'YYYY-MM-DD');
    if (!whereToLook || !options.min)
        return false;
    return whereToLook >= options.min;
}
exports.MinDate = MinDate;
