import { Utilities } from '../utilities/utilities'
import * as util from 'util'

export function RegEx(whereToLook: any, whatToLookFor: any): boolean {
    
    if (!whereToLook || !whatToLookFor) {
        return false
    }
    if (!Utilities.isString(whereToLook)) whereToLook = whereToLook.toString()

    // Have to escape backslashes
    const regexp = new RegExp(whatToLookFor)
    return regexp.test(whereToLook)

}
