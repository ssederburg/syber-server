import { IUserContext, RequestContext } from '../schemas'

const uuidv4 = require('uuid/v4')

export class MockRequestContext extends RequestContext {

    public id: string = uuidv4()
    public body: any = {}
    public cookies: any = {}
    public signedCookies: any = {}
    public method: string = 'POST'
    public params: any = {}
    public query: any = {}
    public user: IUserContext = {
        isAuthenticated: true
    }
    public starttime: Date = new Date()

    constructor(requestBody?: any) {
        super()
        if (requestBody) {
            this.body = Object.assign({}, requestBody)
        }
    }

}