import { Utilities } from '../utilities/utilities';
export function StartsWithAny(text, value) {
    if (!Utilities.isString(value))
        value = value.toString();
    var wasOne = false;
    text.forEach(function (item) {
        if (!wasOne && value.indexOf(item) === 0)
            wasOne = true;
    });
    return wasOne;
}
