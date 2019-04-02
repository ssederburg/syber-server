export class Parameter {
    constructor() {
        this.required = false;
        this.dataType = 'string';
        this.validators = [];
        this.isValid = true;
        this.whiteList = [];
        this.blackList = [];
    }
}
