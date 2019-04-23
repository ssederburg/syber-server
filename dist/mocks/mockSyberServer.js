"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var utilities_1 = require("../utilities");
var responses_1 = require("../responses");
var MockSyberServer = (function () {
    function MockSyberServer() {
        this.events = new events_1.EventEmitter();
        this.logger = new utilities_1.Logger();
    }
    MockSyberServer.prototype.getGlobalSchematicResponse = function (httpStatus) {
        return {
            httpStatus: httpStatus,
            class: responses_1.RawResponse
        };
    };
    return MockSyberServer;
}());
exports.MockSyberServer = MockSyberServer;
