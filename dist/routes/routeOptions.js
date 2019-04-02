export class RouteOptions {
    constructor() {
        this.verb = 'GET';
        this.path = '';
        this.schematic = null;
        this.contentType = 'application/json';
        this.useResolver = false;
        this.sharedResources = [];
    }
    resolve(req) {
        return null;
    }
}
