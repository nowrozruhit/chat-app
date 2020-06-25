const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder for express
app.use(express.static(path.join(__dirname, 'public')));

// run when client connects
io.on('connection', socket => {
  // welcome current user
  socket.emit('message', 'Welcome to Chat App');

  // broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the chat');

  // runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });

  // listen for chatMessage
  socket.on('chatMessage', msg => {
    io.emit('message', msg);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
