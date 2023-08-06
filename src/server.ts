//javascript code for implementing the concept of listening to Websockets with Express
const express = require('express');
const ws = require('ws');

const app = express();

//A headless websocket server is set up that also prints any events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', message => console.log(message));
});

const server = app.listen(3000,() => console.log('Server running on port 3000'));
server. on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
