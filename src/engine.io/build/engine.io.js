"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protocol = exports.Transport = exports.Socket = exports.parser = exports.attach = exports.listen = exports.transports = exports.Server = void 0;
const http_1 = require("http");
const server_1 = require("./server");
Object.defineProperty(exports, "Server", { enumerable: true, get: function () { return server_1.Server; } });
const index_1 = require("./transports/index");
exports.transports = index_1.default;
const parser = require("engine.io-parser");
exports.parser = parser;
var socket_1 = require("./socket");
Object.defineProperty(exports, "Socket", { enumerable: true, get: function () { return socket_1.Socket; } });
var transport_1 = require("./transport");
Object.defineProperty(exports, "Transport", { enumerable: true, get: function () { return transport_1.Transport; } });
exports.protocol = parser.protocol;
/**
 * Creates an http.Server exclusively used for WS upgrades.
 *
 * @param {Number} port
 * @param {Function} callback
 * @param {Object} options
 * @return {Server} websocket.io server
 * @api public
 */
function listen(port, options, fn) {
    if ("function" === typeof options) {
        fn = options;
        options = {};
    }
    const server = (0, http_1.createServer)(function (req, res) {
        res.writeHead(501);
        res.end("Not Implemented");
    });
    // create engine server
    const engine = attach(server, options);
    engine.httpServer = server;
    server.listen(port, fn);
    return engine;
}
exports.listen = listen;
/**
 * Captures upgrade requests for a http.Server.
 *
 * @param {http.Server} server
 * @param {Object} options
 * @return {Server} engine server
 * @api public
 */
function attach(server, options) {
    const engine = new server_1.Server(options);
    engine.attach(server, options);
    return engine;
}
exports.attach = attach;
