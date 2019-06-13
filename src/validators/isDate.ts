import { Utilities } from '../utilities/utilities'
import moment = require('moment');

export function IsDate(whereToLook: any, whatToLookFor: any): boolean {

    const options = Utilities.isObject(whatToLookFor) ? Object.assign({}, whatToLookFor) : {format: 'YYYY-MM-DD'}

    if (!whereToLook) return false

    const fallbackAnswer = (moment.isDate(whereToLook) || moment.isMoment(whereToLook))
    try {
        
        if (!Utilities.isString(whereToLook)) whereToLook = whereToLook.toString()

        const trial1 = Utilities.parseDateInput(whereToLook, options.format)
        if (!trial1) {
            return fallbackAnswer
        }

        return true

    } catch {
        return false
    } 

}