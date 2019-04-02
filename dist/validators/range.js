import { Utilities } from '../utilities/utilities';
export function Range(min, max, value) {
    if (!Utilities.isNumber(value))
        return false;
    return value >= min && value <= max;
}
