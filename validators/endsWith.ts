import { Utilities } from '../utilities/utilities'

export function EndsWith(text: string, value?: any): Boolean {
    if (!Utilities.isString(value)) return false
    return value.indexOf(text)===value.length - text.length
}
