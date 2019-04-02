import { Utilities } from '../utilities/utilities';
export function IsFloat(value) {
    return Utilities.isNumber && value.toString().indexOf('.') >= 0;
}
