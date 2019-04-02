import { ILogger } from '../schemas'
import * as bluebird from 'bluebird'

/**
 * Made all method async so caller does not await their return
*/
export class Logger implements ILogger {

    log(id: string, output: string, source: string):  Promise<any> {
        return new Promise<any>((resolve) => {
            console.log(source ? `${source}: ${output}`: `${output}`)
            resolve()
        })
    }

    info(id: string, output: string, source: string):  Promise<any> {
        return new Promise<any>((resolve) => {
            console.info(source ? `${source}: ${output}`: `${output}`)
            resolve()
        })
    }

    warn(id: string, output: string, source: string):  Promise<any> {
        return new Promise<any>((resolve) => {
            console.warn(source ? `${source}: ${output}`: `${output}`)
            resolve()
        })
    }
    error(id: string, output: string, source: string):  Promise<any> {
        return new Promise<any>((resolve) => {
            console.error(source ? `${source}: ${output}`: `${output}`)
            resolve()
        })
    }
    debug(id: string, output: string, source: string):  Promise<any> {
        return new Promise<any>((resolve) => {
            console.debug(source ? `${source}: ${output}`: `${output}`)
            resolve()
        })
    }
    dir(id: string, output: any, source: string):  Promise<any> {
        return new Promise<any>((resolve) => {
            console.dir(source ? `${source}:\n${output}`: `${output}`)
            resolve()
        })
    }
}