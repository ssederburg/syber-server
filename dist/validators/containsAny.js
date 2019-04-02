import { Utilities } from '../utilities/utilities';
export function ContainsAny(input, value) {
    if (!Utilities.isArray(input))
        return false;
    var wasOne = false;
    input.forEach(function (item) {
        if (!wasOne && value.indexOf(item) >= 0) {
            wasOne = true;
        }
    });
    return wasOne;
}
