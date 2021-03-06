"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDone = exports.isDirty = exports.isPending = exports.isInProgress = exports.by = exports.and = void 0;
const node_1 = require("./node");
function and(...criteria) {
    return (node) => criteria.every(c => c(node));
}
exports.and = and;
function by(criteria) {
    function fn(args) {
        return criteria(args);
    }
    fn['and'] = function (args) {
        return and(criteria, args);
    };
    return fn;
}
exports.by = by;
function isInProgress(node) {
    return node.state === node_1.STATE_IN_PROGRESS;
}
exports.isInProgress = isInProgress;
function isPending(node) {
    return node.state === node_1.STATE_PENDING;
}
exports.isPending = isPending;
function isDirty(node) {
    return node.state === node_1.STATE_DIRTY;
}
exports.isDirty = isDirty;
function isDone(node) {
    return node.state === node_1.STATE_DONE;
}
exports.isDone = isDone;
//# sourceMappingURL=select.js.map