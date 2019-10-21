const express = require('express');
const http = require('http');
const socketIO = require('socket.io');


const port = process.env.NODE_PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname, + '/example.html')
});

io.on('connection', socket => {
  console.log('a user connected: ', socket)
});

http.listen(app.get('port'), () => {
  console.log(`listening on *:${app.get('port')}`);
});