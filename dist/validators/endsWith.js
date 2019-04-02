import { Utilities } from '../utilities/utilities';
export function EndsWith(text, value) {
    if (!Utilities.isString(value))
        return false;
    return value.indexOf(text) === value.length - text.length;
}
