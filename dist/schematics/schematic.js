var Schematic = (function () {
    function Schematic() {
        this.parameters = [];
        this.timeout = 5000;
        this.activities = [];
        this.responses = [];
        this.resources = [];
    }
    return Schematic;
}());
export { Schematic };
