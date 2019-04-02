var Logger = (function () {
    function Logger() {
    }
    Logger.prototype.log = function (output, source) {
        return new Promise(function (resolve) {
            console.log(source ? source + ": " + output : "" + output);
            resolve();
        });
    };
    Logger.prototype.warn = function (output, source) {
        return new Promise(function (resolve) {
            console.warn(source ? source + ": " + output : "" + output);
            resolve();
        });
    };
    Logger.prototype.error = function (output, source) {
        return new Promise(function (resolve) {
            console.error(source ? source + ": " + output : "" + output);
            resolve();
        });
    };
    Logger.prototype.debug = function (output, source) {
        return new Promise(function (resolve) {
            console.debug(source ? source + ": " + output : "" + output);
            resolve();
        });
    };
    Logger.prototype.dir = function (output, source) {
        return new Promise(function (resolve) {
            console.dir(source ? source + ":\n" + output : "" + output);
            resolve();
        });
    };
    return Logger;
}());
export { Logger };
