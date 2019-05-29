import { Utilities } from '../utilities/utilities'

export function IsObject(whereToLook: any): Boolean {
    if (!whereToLook) {
        return false
    }
    const trial1 = Utilities.isObject(whereToLook)
    if (trial1) return true

    try {
        if (Utilities.isString(whereToLook)) {
            const trial2 = JSON.parse(whereToLook)
            //console.log(`Inspected Object ${whereToLook} became ${JSON.stringify(trial2)}`)
            return trial2 !== null
        }
        //console.log(`${whereToLook} is not a string`)
        return false
    } catch (err) {
        //console.log(`Error parsing Object ${whereToLook}: ${err.message}`)
        return false
    }
}
