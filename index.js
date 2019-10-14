//jshint esversion: 6
const express = require('express');
const app = express();

//template engine:
app.set('view engine', 'ejs');

//middleware:
app.use(express.static(__dirname + '/public'));

//routes: (move to separate folders later in dev)
app.get('/', (req, res) => {
  res.render('index');
});

server = app.listen(3000);

//socket.io setup:
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('New user connected!');

  //default username:
  socket.username = 'Anonymous';

  //listen on change_username:
  socket.on('change_username', (data) => {
    socket.username = data.username;
  });

  //listen on new_message:
  socket.on('new_message', (data) => {
    //broadcast message:
    io.sockets.emit('new_message', {message: data.message, username: socket.username});
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', {username: socket.username});
  });

});
