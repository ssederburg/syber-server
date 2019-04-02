import { Utilities } from '../utilities/utilities';
export function StartsWith(text, value) {
    if (!Utilities.isString(value))
        return false;
    return value.indexOf(text) === 0;
}
