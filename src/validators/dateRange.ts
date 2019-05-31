import { Utilities } from '../utilities/utilities'
import { MinDate, MaxDate } from '../validators'

// {min: whatToLookFor, minFormat: 'YYYY-MM-DD', max: whatToLookFor, maxFormat: 'YYYY-MM-DD', sourceFormat: 'YYYY-MM-DD'}
export function DateRange(whereToLook: any, whatToLookFor): boolean {

    return MinDate(whereToLook, whatToLookFor) && MaxDate(whereToLook, whatToLookFor)

}
