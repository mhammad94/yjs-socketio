"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var config_1 = __importDefault(require("config"));
var logger_1 = __importDefault(require("./utils/logger"));
var server_1 = require("y-socket.io/dist/server");
var port = process.env.PORT || '4000';
var host = process.env.HOST;
var corsOrigin = config_1["default"].get("corsOrigin");
var app = (0, express_1["default"])();
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true
    }
});
var ysocketio = new server_1.YSocketIO(io);
ysocketio.initialize();
app.get("/", function (_, res) {
    res.send("Server is up");
});
httpServer.listen(port, function () {
    logger_1["default"].info("Server is listening");
    logger_1["default"].info("Server is listening at ".concat(port));
});
