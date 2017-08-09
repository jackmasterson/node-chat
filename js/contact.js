var socket = io.connect();
var d = document.getElementById('contact-saved');
d.innerHTML = '';
socket.on('connect', function() {
	console.log();
	socket.emit('join', 'Hello World from CONTACT.JS');
});

var save = document.getElementById('save-contact');
save.addEventListener('click', function() {
	console.log('clicked');
	var name = document.getElementById('contact-name').value;
	var number = document.getElementById('contact-number').value;
	d.innerHTML = 'Contact Saved!';
	console.log(name, number);
	if (typeof name !== 'undefined' && typeof number !== 'undefined') {
		var cont = {
			name: name,
			number: number
		}
		console.log('should be emitting: ', cont);
		socket.emit('add-contact', cont);
	}
});
