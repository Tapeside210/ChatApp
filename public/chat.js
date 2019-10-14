//jshint esversion:6
$(function(){
  var socket = io.connect('http://localhost:3000');

  //buttons/inputs:
  let message = $("#message");
  let username = $('#username');
  let send_message = $('#send_message');
  let send_username = $('#send_username');
  let chatroom = $('#chatroom');
  let feedback = $('#feedback');

  //Emit typing:
  message.bind("keypress", () => {
    socket.emit('typing');
  });

  //Listen on typing:
  socket.on('typing', (data) => {
    feedback.html("<p><i>" + data.username + " is typing ..." + "</i></p>");
  });

  //Emit message:
  send_message.click(() => {
    socket.emit('new_message', {message: message.val()});
  });

  //emit username:
  send_username.click(() => {
    console.log(username.val());
    socket.emit('change_username', {username: username.val()});
  });

  //Listen on new_message:
  socket.on('new_message', (data) => {
    console.log(data);
    chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
  });

});
