import { Utilities } from '../utilities/utilities'
import moment = require('moment');

export function IsDate(whereToLook: any, whatToLookFor: any) {

    const options = Utilities.isObject(whatToLookFor) ? whatToLookFor : {format: 'YYYY-MM-DD'}

    if (!whereToLook) return false

    if (moment.isDate(whereToLook) || moment.isMoment(whereToLook)) return true

    try {
        
        if (!Utilities.isString(whereToLook)) whereToLook = whereToLook.toString()
        const trial1 = Utilities.parseDateInput(whereToLook, options.format)
        if (!trial1) return false

        return true

    } catch {
        return false
    } 

}