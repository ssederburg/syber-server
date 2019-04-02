import { ILogger } from '../schemas';
export declare class Logger implements ILogger {
    log(id: string, output: string, source: string): Promise<any>;
    info(id: string, output: string, source: string): Promise<any>;
    warn(id: string, output: string, source: string): Promise<any>;
    error(id: string, output: string, source: string): Promise<any>;
    debug(id: string, output: string, source: string): Promise<any>;
    dir(id: string, output: any, source: string): Promise<any>;
}
