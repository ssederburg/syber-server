import { ILogger } from './schemas';
export declare class SyberServerOptions {
    port: number;
    staticPath?: string;
    baseHref?: string;
    logger: ILogger;
}
