"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities/utilities");
function IsFloat(whereToLook, whatToLookFor) {
    if (!whereToLook)
        return false;
    if (whereToLook === null || whereToLook === undefined)
        return false;
    var theChar = '.';
    if (whatToLookFor && whatToLookFor.decimalChar) {
        theChar = whatToLookFor.decimalChar;
    }
    var localNumberText = whereToLook.replace(theChar, '.');
    if (localNumberText.indexOf('+') === 0 || localNumberText.indexOf('-') === 0) {
        localNumberText = localNumberText.replace('+', '').replace('-', '');
    }
    try {
        if (utilities_1.Utilities.isNumber(localNumberText) && !isNaN(parseFloat(localNumberText)) && whereToLook.indexOf(theChar) >= 0) {
            if (whatToLookFor) {
                if (whatToLookFor.precision && localNumberText.length - 1 !== whatToLookFor.precision) {
                    return false;
                }
                if (whatToLookFor.maxPrecision && localNumberText.length - 1 > whatToLookFor.maxPrecision) {
                    return false;
                }
                if (whatToLookFor.minPrecision && localNumberText.length - 1 < whatToLookFor.minPrecision) {
                    return false;
                }
                if (whatToLookFor.scale || whatToLookFor.minScale || whatToLookFor.maxScale) {
                    var decimals = whereToLook.substr(whereToLook.indexOf(theChar) + 1);
                    if (whatToLookFor.scale && decimals.length !== whatToLookFor.scale) {
                        return false;
                    }
                    if (whatToLookFor.maxScale && decimals.length > whatToLookFor.maxScale) {
                        return false;
                    }
                    if (whatToLookFor.minScale && decimals.length < whatToLookFor.minScale) {
                        return false;
                    }
                }
            }
            return true;
        }
        console.log("Value " + localNumberText + " is not a number");
        return false;
    }
    catch (_a) {
        return false;
    }
}
exports.IsFloat = IsFloat;
