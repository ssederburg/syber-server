import { Utilities } from '../utilities/utilities'

export function Min(min: number, value?: any): Boolean {
    if (!Utilities.isNumber(value)) return false
    return value >= min
}
