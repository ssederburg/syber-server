"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteOptions {
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
exports.RouteOptions = RouteOptions;
