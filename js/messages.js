var socket = io.connect();
socket.on('connect', function(data) {
  // init.socket.emit('join', 'Hello World from client');
});
socket.on('incoming', function (text) {
  var d = document.createElement('div');
  d.innerHTML = text;
  document.body.appendChild(d);
  // add the message to a new database collection,
  // under each contact's name
});
