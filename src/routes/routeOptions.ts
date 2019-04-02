import { Schematic } from '../schematics'
import { RequestContext } from '../schemas'

export class RouteOptions {
    verb: string = 'GET'
    path: string = ''
    schematic?: typeof Schematic = null
    contentType?: string = 'application/json'
    useResolver?: boolean = false
    sharedResources?: Array<any> = []
    
    public resolve?(req: RequestContext): Promise<typeof Schematic>|typeof Schematic|null {
        return null
    }

}
