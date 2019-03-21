import { BaseProcessor, ProcessorResponse } from '../schemas'

export class RawResponse extends BaseProcessor {

    fx(args: any): Promise<ProcessorResponse> {

        const result: Promise<ProcessorResponse> = new Promise((resolve, reject) => {

            try {
                return resolve({
                    successful: true,
                    message: 'OK',
                    data: Object.assign({}, this.executionContext.raw)
                })
            }
            catch (err) {
                reject(err)
            }

        })

        return result

    }

}