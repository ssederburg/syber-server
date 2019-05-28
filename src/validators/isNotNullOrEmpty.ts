import { Utilities } from '../utilities/utilities'

// Read as: Is whereToLook Null or Empty? Should we trim it before we inspect? Should we treat keywords as their values e.g. 'null'?
// whatToLookFor: { trim: true|false, keywordMatch: true|false }

export function IsNotNullOrEmpty(whereToLook: any, whatToLookFor: any): Boolean {
    
    const options = Utilities.isObject(whatToLookFor) ? whatToLookFor : {trim: false, keywordMatch: false}

    if (!whereToLook) return false

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
