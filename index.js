const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.NODE_PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set('port', port);

app.get('/', (req, res) => {
  res.sendFile(__dirname, + '/example.html')
});

io.on('connection', socket => {
  console.log('a user connected: ', socket.id);

  socket.on('chat', msg => {
    console.log(`socket ${socket.id} send a message to chat room`);
    console.log(`received a msg: ${msg}`);
    console.log('now echoing the message');
    socket.emit('chat', msg);
  });

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

server.listen(app.get('port'), () => {
  console.log(`listening on *:${app.get('port')}`);
});
