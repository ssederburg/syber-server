import { IsNotNullOrEmpty } from '../validators'

// Read as: Is whereToLook Null or Empty? Should we trim it before we inspect? Should we treat keywords as their values e.g. 'null'?
// whatToLookFor: { trim: true|false, keywordMatch: true|false }

export function IsNullOrEmpty(whereToLook: any, whatToLookFor: any): Boolean {
    
    return !IsNotNullOrEmpty(whereToLook, whatToLookFor)
    
}
