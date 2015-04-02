var WebSocketServer = require('websocket').server;
var user = require('./User');
var http = require('http');
var url = require('url');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var server = http.createServer(function (request, response) {
    
});
server.events = {};
server.users = {};
server.events.message = function (server, data) {
    wsServer.connections.forEach(function (c) {
        c.send(JSON.stringify({
            data: {
                message: data.message,
                name: data.name
            },
            event: 'message',
        }));
    });
};

server.listen(1337, function () { });
var events = {};
var wsServer = new WebSocketServer({
    httpServer: server,
    maxReceivedFrameSize: 64000000
});
wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            message = JSON.parse(message.utf8Data);
            if (server.events.hasOwnProperty(message.event)) {
                server.events[message.event](wsServer, message.data);
            }
        }
    });
    
    connection.on('close', function (connection) {
    });
});