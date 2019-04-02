import { Utilities } from '../utilities/utilities';
export function MinDate(minDate, value) {
    if (!Utilities.isDate(value))
        return false;
    return value >= new Date(minDate);
}
