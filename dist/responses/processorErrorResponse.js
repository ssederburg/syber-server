export class ProcessorErrorResponse {
    constructor() {
        this.source = 'unknown';
        this.successful = false;
        this.message = null;
        this.httpStatus = 500;
        this.data = {};
        this.err = {};
    }
}
