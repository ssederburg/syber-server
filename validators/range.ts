import { Utilities } from '../utilities/utilities'

export function Range(min: number, max: number, value?: any): Boolean {
    if (!Utilities.isNumber(value)) return false
    return value >= min && value <= max
}
