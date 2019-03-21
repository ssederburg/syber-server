import { Utilities } from '../utilities/utilities'

export function MinDate(minDate: string, value?: any): Boolean {
    if (!Utilities.isDate(value)) return false
    return value >= new Date(minDate)
}
