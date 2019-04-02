import { Utilities } from '../utilities/utilities'

export function StartsWith(text: string, value?: any): Boolean {
    if (!Utilities.isString(value)) return false
    return value.indexOf(text)===0
}
