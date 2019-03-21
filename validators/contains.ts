import { Utilities } from '../utilities/utilities'

export function Contains(input: any, value?: any): Boolean {
    if (!Utilities.isString(value)) value = value.toString()
    return value.indexOf(input) >= 0
}
