import { Utilities } from '../utilities/utilities'
import { MinDate, MaxDate } from '../validators'

// {min: whatToLookFor, minFormat: 'YYYY-MM-DD', max: whatToLookFor, maxFormat: 'YYYY-MM-DD', sourceFormat: 'YYYY-MM-DD'}
export function DateRange(whereToLook: any, whatToLookFor): boolean {

    const options = Object.assign({}, whatToLookFor)
    return MinDate(whereToLook, options) && MaxDate(whereToLook, options)

}
