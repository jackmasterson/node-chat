var socket = io.connect(window.location.href + ':3511');
socket.on('connect', function(data) {
	socket.emit('join', 'Hello World from CONTACT.JS');
});

var save = document.getElementById('save-contact');
save.addEventListener('click', function() {
	var name = document.getElementById('contact-name').value;
	var number = document.getElementById('contact-number').value;
	if (typeof name !== 'undefined' && typeof number !== 'undefined') {
		var cont = {
			name: name, 
			number: number
		}
		socket.emit('add-contact', cont);
	}
});

