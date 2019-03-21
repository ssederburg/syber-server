import { ProcessorResponse, ProcessorErrorResponse } from '../schemas'
import { BaseProcessor } from '../processors'
import { Utilities } from '../utilities/utilities'

export class TestAsyncSleepProcessor extends BaseProcessor {

    fx(): Promise<ProcessorResponse|ProcessorErrorResponse> {

        const result: Promise<ProcessorResponse|ProcessorErrorResponse> = new Promise(async(resolve, reject) => {
            try {

                let timeout = 0
                
                if (!this.processorDef || !this.processorDef.args || !this.processorDef.args.timeout || !Utilities.isNumber(this.processorDef.args.timeout)) {
                    console.log(`SyberServer.TestSyncSleepProcessor.Warning: Invalid value set in schematic for args.timeout. Using default of 1 second.`)
                    timeout = 1000
                } else {
                    timeout = this.processorDef.args.timeout
                }

                await this.runAsync(timeout)
                return resolve({
                    successful: true
                })
                
            }
            catch (err) {
                return reject(this.handleError(err, 'TestAsyncSleepProcessor'))
            }
        })

        return result

    }

    private async runAsync(timeout: number): Promise<any> {

        const result: Promise<any> = new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    return resolve()
                }, timeout)                
            }
            catch (err) {
                return reject()
            }
        })

        return result
    }

}