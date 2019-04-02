import { Utilities } from '../utilities/utilities';
export function MinLength(len, value) {
    if (!Utilities.isString(value))
        value = value.toString();
    return value.length >= len;
}
