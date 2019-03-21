import { BaseProcessor, ProcessorResponse } from '../schemas'

export class FieldComposer extends BaseProcessor {

    fx(args?: any): Promise<ProcessorResponse> {

        const result: Promise<ProcessorResponse> = new Promise((resolve, reject) => {
            try {
                const output = {}
                if (!this.executionContext.schematic.parameters || this.executionContext.schematic.parameters.length <= 0) {
                    return resolve({
                        successful: false,
                        message: `No parameters listed in schematic`
                    })
                }
                this.executionContext.schematic.parameters.forEach((parameter) => {
                    output[parameter.name] = this.executionContext.getParameterValue(parameter.name)
                })
                this.executionContext.raw = Object.assign({}, output)
                return resolve({
                    successful: true
                })
            }
            catch (err) {
                return reject({
                    successful: false,
                    message: `FieldComposer.Error`,
                    data: err
                })
            }
        })

        return result

    }

}