import { Utilities } from '../utilities/utilities';
export function Max(max, value) {
    if (!Utilities.isNumber(value))
        return false;
    return value <= max;
}
