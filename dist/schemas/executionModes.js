export var ExecutionMode;
(function (ExecutionMode) {
    ExecutionMode[ExecutionMode["Sequential"] = 0] = "Sequential";
    ExecutionMode[ExecutionMode["Concurrent"] = 1] = "Concurrent";
})(ExecutionMode || (ExecutionMode = {}));
