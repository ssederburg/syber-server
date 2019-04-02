import { Utilities } from '../utilities/utilities';
export function Min(min, value) {
    if (!Utilities.isNumber(value))
        return false;
    return value >= min;
}
