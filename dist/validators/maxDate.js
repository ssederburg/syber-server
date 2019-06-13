"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function MaxDate(whereToLook, whatToLookFor) {
    var options = utilities_1.Utilities.isObject(whatToLookFor) ? Object.assign({}, whatToLookFor) : { max: whatToLookFor, maxFormat: 'YYYY-MM-DD', sourceFormat: 'YYYY-MM-DD' };
    whereToLook = utilities_1.Utilities.parseDateInput(whereToLook, options.sourceFormat || 'YYYY-MM-DD');
    options.max = utilities_1.Utilities.parseDateInput(options.max, options.maxFormat || 'YYYY-MM-DD');
    if (!whereToLook || !options.max)
        return false;
    return whereToLook <= options.max;
}
exports.MaxDate = MaxDate;
