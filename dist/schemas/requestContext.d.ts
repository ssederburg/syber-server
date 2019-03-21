import { IUserContext } from './iuserContext';
export declare class RequestContext {
    id?: string;
    baseUrl?: string;
    body?: any;
    cookies?: any;
    signedCookies?: any;
    fresh?: boolean;
    hostname?: string;
    ip?: string;
    ips?: Array<string>;
    method?: string;
    originalUrl?: string;
    params?: any;
    path?: string;
    protocol?: string;
    query?: any;
    route?: string;
    secure?: boolean;
    stale?: boolean;
    subdomains?: Array<string>;
    xhr?: boolean;
    user?: IUserContext;
    setTimeout?(interval: number): any;
    timedout?: boolean;
    starttime: Date;
}
