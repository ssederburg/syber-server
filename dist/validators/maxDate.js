import { Utilities } from '../utilities/utilities';
export function MaxDate(maxDate, value) {
    if (!Utilities.isDate(value))
        return false;
    return value <= new Date(maxDate);
}
