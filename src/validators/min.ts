import { Utilities } from '../utilities/utilities'

export function Min(whereToLook: any, whatToLookFor: any): boolean {
    
    if (!whereToLook && whereToLook !== 0) {
        return false
    }
    if (!whatToLookFor && whatToLookFor !== 0) {
        return false
    }
    if (!Utilities.isNumber(whereToLook)) return false
    if (!Utilities.isNumber(whatToLookFor)) return false

    const whereToLookNumber = Number(whereToLook)
    const whatToLookForNumber = Number(whatToLookFor)

    return whereToLookNumber >= whatToLookForNumber

}
