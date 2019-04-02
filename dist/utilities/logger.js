export class Logger {
    log(id, output, source) {
        return new Promise((resolve) => {
            console.log(source ? `${source}: ${output}` : `${output}`);
            resolve();
        });
    }
    info(id, output, source) {
        return new Promise((resolve) => {
            console.info(source ? `${source}: ${output}` : `${output}`);
            resolve();
        });
    }
    warn(id, output, source) {
        return new Promise((resolve) => {
            console.warn(source ? `${source}: ${output}` : `${output}`);
            resolve();
        });
    }
    error(id, output, source) {
        return new Promise((resolve) => {
            console.error(source ? `${source}: ${output}` : `${output}`);
            resolve();
        });
    }
    debug(id, output, source) {
        return new Promise((resolve) => {
            console.debug(source ? `${source}: ${output}` : `${output}`);
            resolve();
        });
    }
    dir(id, output, source) {
        return new Promise((resolve) => {
            console.dir(source ? `${source}:\n${output}` : `${output}`);
            resolve();
        });
    }
}
