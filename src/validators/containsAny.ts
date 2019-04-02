import { Utilities } from '../utilities/utilities'

export function ContainsAny(input: Array<any>, value?: any): Boolean {
    if (!Utilities.isArray(input)) return false
    let wasOne = false
    input.forEach((item) => {
        if (!wasOne && value.indexOf(item) >= 0) {
            wasOne = true
        }
    })
    return wasOne
}
