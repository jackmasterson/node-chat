var init = {
	lets: function(send) {
		for (var k = 0; k < send.length; k++) {
			var contact = send[k].name;
			var phone = send[k].number;
			var v = document.createElement('div');
			v.setAttribute('class', 'contacts letters');
			v.innerHTML = contact;
			v.setAttribute('data-phone-id', phone);
			document.body.appendChild(v);
		}
		house.contacts();
	}
}
var house = {

	contacts: function() {
		var divs = document.querySelectorAll('.contacts');
		for (var f = 0; f < divs.length; f++) {
			divs[f].setAttribute('class', 'contacts letters');
			divs[f].addEventListener('click', function() {
				socket.emit('destination', this.getAttribute('data-phone-id'));
			});
		}
	}

};

socket = io.connect();
	socket.on('connect', function(data) {
		socket.emit('join', 'send.js activated');
	});
	socket.on('mongo', function (dbData) {
		init.lets(dbData);
	});

house.contacts();