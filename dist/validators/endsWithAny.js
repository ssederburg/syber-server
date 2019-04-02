import { Utilities } from '../utilities/utilities';
export function EndsWithAny(text, value) {
    if (!Utilities.isString(value))
        value = value.toString();
    let wasOne = false;
    text.forEach((item) => {
        if (!wasOne && value.indexOf(item) === value.length - item.length)
            wasOne = true;
    });
    return wasOne;
}
