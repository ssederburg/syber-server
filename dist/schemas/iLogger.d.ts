export interface ILogger {
    log(output: string, source?: string): Promise<any>;
    debug(output: string, source?: string): Promise<any>;
    error(output: string, source?: string): Promise<any>;
    warn(output: string, source?: string): Promise<any>;
    dir?(output: any, source?: string): Promise<any>;
}
