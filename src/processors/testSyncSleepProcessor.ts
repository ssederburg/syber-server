import { ProcessorResponse, ProcessorErrorResponse } from '../responses'
import { BaseProcessor } from '../processors'
import { Utilities } from '../utilities/utilities'

export class TestSyncSleepProcessor extends BaseProcessor {

    fx(): Promise<ProcessorResponse|ProcessorErrorResponse> {

        const result: Promise<ProcessorResponse|ProcessorErrorResponse> = new Promise((resolve, reject) => {
            try {
                let timeout = 0
                
                if (!this.processorDef || !this.processorDef.args || !this.processorDef.args.timeout || !Utilities.isNumber(this.processorDef.args.timeout)) {
                    this.logger.warn(`SyberServer.TestSyncSleepProcessor.Warning: Invalid value set in schematic for args.timeout. Using default of 1 second.`, `testSyncSleepProcessor.fx`)
                    timeout = 1000
                } else {
                    timeout = this.processorDef.args.timeout
                }

                setTimeout(() => {
                    return resolve({
                        successful: true
                    })
                }, timeout)

            }
            catch (err) {
                return reject(this.handleError(err, 'TestSyncSleepProcessor', 500))
            }
        })

        return result

    }

}