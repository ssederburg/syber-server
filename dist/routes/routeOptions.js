"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteOptions = (function () {
    function RouteOptions() {
        this.verb = 'GET';
        this.path = '';
        this.schematic = null;
        this.contentType = 'application/json';
        this.useResolver = false;
        this.sharedResources = [];
    }
    RouteOptions.prototype.resolve = function (req) {
        return null;
    };
    return RouteOptions;
}());
exports.RouteOptions = RouteOptions;
