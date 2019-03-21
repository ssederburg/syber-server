import { Utilities } from '../utilities/utilities'

export function MaxDate(maxDate: string, value?: any): Boolean {
    if (!Utilities.isDate(value)) return false
    return value <= new Date(maxDate)
}
