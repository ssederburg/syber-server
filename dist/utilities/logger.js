var Logger = (function () {
    function Logger() {
    }
    Logger.prototype.log = function (id, output, source) {
        return new Promise(function (resolve) {
            console.log(source ? source + ": " + output : "" + output);
            resolve();
        });
    };
    Logger.prototype.info = function (id, output, source) {
        return new Promise(function (resolve) {
            console.info(source ? source + ": " + output : "" + output);
            resolve();
        });
    };
    Logger.prototype.warn = function (id, output, source) {
        return new Promise(function (resolve) {
            console.warn(source ? source + ": " + output : "" + output);
            resolve();
        });
    };
    Logger.prototype.error = function (id, output, source) {
        return new Promise(function (resolve) {
            console.error(source ? source + ": " + output : "" + output);
            resolve();
        });
    };
    Logger.prototype.debug = function (id, output, source) {
        return new Promise(function (resolve) {
            console.debug(source ? source + ": " + output : "" + output);
            resolve();
        });
    };
    Logger.prototype.dir = function (id, output, source) {
        return new Promise(function (resolve) {
            console.dir(source ? source + ":\n" + output : "" + output);
            resolve();
        });
    };
    return Logger;
}());
export { Logger };
