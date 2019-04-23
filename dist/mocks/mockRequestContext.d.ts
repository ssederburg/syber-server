import { IUserContext, RequestContext } from '../schemas';
export declare class MockRequestContext extends RequestContext {
    id: string;
    body: any;
    cookies: any;
    signedCookies: any;
    method: string;
    params: any;
    query: any;
    user: IUserContext;
    starttime: Date;
    constructor(requestBody?: any);
}
