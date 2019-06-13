import { Utilities } from '../utilities/utilities'
import { isBoolean } from 'util';

// Read as: Is whereToLook Null or Empty? Should we trim it before we inspect? Should we treat keywords as their values e.g. 'null'?
// whatToLookFor: { trim: true|false, keywordMatch: true|false }

export function IsNotNullOrEmpty(whereToLook: any, whatToLookFor: any): boolean {
    
    const options = Utilities.isObject(whatToLookFor) ? Object.assign({}, whatToLookFor) : {trim: false, keywordMatch: false}

    if (!whereToLook && typeof whereToLook !== 'boolean') return false

    if (!Utilities.isString(whereToLook)) whereToLook = whereToLook.toString()
    // It is safe to just treat as a lower case string from here on out
    whereToLook = whereToLook.toLowerCase()
    if (options.trim) {
        whereToLook = whereToLook.replace(/\s/g, '')
    }
    if(!whereToLook || whereToLook === '') return false

    if (options.keywordMatch && whereToLook === 'null' || whereToLook === 'undefined') {
        return false
    }

    return true
    
}
