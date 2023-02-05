const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const messages = [];

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});


io.on('connection', (socket) => {
  const userName = socket.handshake.query.userName;
  socket.on('message', (data) => {
    const message = {
      'message': data.message,
      'senderUserName': userName,
      'sendAt': Date.now()
    };
    messages.push(message);
    io.emit('message', message);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});