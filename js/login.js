var socket = io.connect('http://localhost:7094/');
var sub = document.getElementById('submit-info');
sub.addEventListener('click', function() {
	var un = document.getElementById('username');
	var pw = document.getElementById('password');
	console.log(un.value);
	console.log(pw.value);
	// socket.on('connect', function(data) {
		socket.emit('login-now', {un: un.value, pw: pw.value});
	// });
});

socket.on('logged-in', function(data) {
	console.log(data);
	if (data === true) {
		var a = document.createElement('a');
		a.setAttribute('href', '/home');
		a.innerHTML = 'click to proceed';
		document.body.appendChild(a);
	}
});
