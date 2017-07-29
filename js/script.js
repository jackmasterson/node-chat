var keyboard = window.keyboard;
var auto = window.auto;
var store = {
	message: [],
	dest: [],
	autoMess: [],
}
// set this in the database, and if the name clicked matches the name in the backend, use it?
// this will also be coming from an auth'd user in a secure database, ideally
var send;

var init = {

	openSocket: function() {

		init.socket = io.connect(window.location.origin + ':3511');
			init.socket.on('connect', function(data) {
				init.socket.emit('join', 'Hello World from client');
			});
			init.socket.on('mongo', function (dbData) {
				send = dbData;
				init.lets();
			});
	},

	lets: function() {
		init.keyboard(keyboard, 'character');
	},

	keyboard: function(arr, type) {
		var character;
		var num;
		var a = document.createElement('a');
		for (var k = 0; k < arr.length; k++) {
			if (type === 'character') {
				character = arr[k].character;
				num = arr[k].num;
			}
			var d = document.createElement('div');
			
			d.innerHTML = character;
			house.getValue(d, character, num);
			house.setClasses(d, num);
			document.body.appendChild(d);
		}
		a.setAttribute('href', '/send-to');
		a.innerHTML = 'send to';
		a.addEventListener('click', function() {
			init.socket.emit('message', grabs.h3.innerHTML);
			store.message.length = 0;
		});
		document.body.appendChild(a);
		init.createAutoSlots();
	},

	createAutoSlots: function() {
		for (var t = 0; t < 6; t++) {
			var j = document.createElement('div');
			j.setAttribute('class', 'letters hide autoword');
			j.addEventListener('click', function() {
				store.message.pop();
				store.message.push(this.innerHTML + ' ');
				house.showMessage();
			});
			document.body.appendChild(j);
		}
	},

	autoPopulate: function(arr, type) {
		var slots = document.getElementsByClassName('autoword');
		if (arr.length === 0) {
			for (var t = 0; t < slots.length; t++) {
				slots[t].setAttribute('class', 'letters hide autoword');
			}
		} else {
			for (var f = 0; f < slots.length; f++) {
				slots[f].setAttribute('class', 'letters hide autoword');
			}

			for (var t = 0; t < arr.length; t++) {
				slots[t].innerHTML = arr[t];
				slots[t].setAttribute('class', 'letters autoword');
			}
		}
		init.autofillLength = arr.length;
	}
};

var grabs = {
	letters: document.getElementsByClassName('letters'),
	mess: document.getElementById('message'),
	h3: document.getElementById('message'),
};

var house = {
	getValue: function(pos, val, num) {
		pos.addEventListener('click', function() {
			// store.autoMess.length = 0;
			if (val === 'backspace') {
				store.message.pop();
			} else if (val === 'send-to') {
				// for (var t = 0; t < grabs.letters.length; t++) {
				// 	var letter = grabs.letters[t];
				// 	letter.setAttribute('class', 'letters hide');
				// }
			 //    init.socket.emit('message', grabs.h3.innerHTML);
				// store.message.length = 0;
				// house.contacts();
			}
			if (val !== 'backspace' && val !== 'send-to') {
				store.message.push(this.innerHTML);
			}

			var show = house.showMessage().split(' ');
			var len = show.length - 1;
			show = show[len];
			for (var f = 0; f < auto.length; f++) {
				var aut = auto[f].phrase;
				if (aut.indexOf(show) > -1) {
					store.autoMess.push(aut);
				}
			}
			if (val!== 'send-to') {
				init.autoPopulate(store.autoMess, 'autofill');
			}
		});
	},

	showMessage: function() {
		messNow = store.message.join('');
		grabs.mess.innerHTML = messNow;
		return grabs.mess.innerHTML;
	},

	setClasses: function(d, num) {
		d.setAttribute('class', 'letters');
		if (num >=65 && num <= 75) {
			d.setAttribute('class', 'letters space-top');
		}
		if (num >= 76 && num <= 79) {
			d.setAttribute('class', 'letters space-right');
		}
		if (num === 32) {
			d.setAttribute('class', 'letters space-bar');
		}
		if (num === 8) {
			d.setAttribute('class', 'letters back-space');
		}
		// if (num === false) {

		// 	// d.setAttribute('class', 'letters send-to');
		// 	// d.setAttribute('id', 'send-now');
		// }
		if (num === '') {
			d.setAttribute('class', 'letters autoword');
		}
	}

};



init.openSocket();
