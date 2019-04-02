import { ILogger } from '../schemas'
import * as bluebird from 'bluebird'

/**
 * Made all method async so caller does not await their return
*/
export class Logger implements ILogger {

    log(output: string, source?: string):  Promise<any> {
        return new Promise<any>((resolve) => {
            console.log(source ? `${source}: ${output}`: `${output}`)
            resolve()
        })
    }

    warn(output: string, source?: string):  Promise<any> {
        return new Promise<any>((resolve) => {
            console.warn(source ? `${source}: ${output}`: `${output}`)
            resolve()
        })
    }
    error(output: string, source?: string):  Promise<any> {
        return new Promise<any>((resolve) => {
            console.error(source ? `${source}: ${output}`: `${output}`)
            resolve()
        })
    }
    debug(output: string, source?: string):  Promise<any> {
        return new Promise<any>((resolve) => {
            console.debug(source ? `${source}: ${output}`: `${output}`)
            resolve()
        })
    }
    dir(output: any, source?: string):  Promise<any> {
        return new Promise<any>((resolve) => {
            console.dir(source ? `${source}:\n${output}`: `${output}`)
            resolve()
        })
    }
}