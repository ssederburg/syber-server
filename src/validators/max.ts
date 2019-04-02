import { Utilities } from '../utilities/utilities'

export function Max(max: number, value?: any): Boolean {
    if (!Utilities.isNumber(value)) return false
    return value <= max
}
