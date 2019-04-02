var Parameter = (function () {
    function Parameter() {
        this.required = false;
        this.dataType = 'string';
        this.validators = [];
        this.isValid = true;
        this.whiteList = [];
        this.blackList = [];
    }
    return Parameter;
}());
export { Parameter };
