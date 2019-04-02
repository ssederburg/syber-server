import { ILogger } from './schemas'

export class SyberServerOptions {
    port: number = 3000
    staticPath?: string = null
    baseHref?: string = null
    logger: ILogger = null
}

