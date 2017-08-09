var keyboard = window.keyboard;
var auto = window.auto;
var store = {
	message: [],
	dest: [],
	autoMess: [],
	x: 0,
}
// set this in the database, and if the name clicked matches the name in the backend, use it?
// this will also be coming from an auth'd user in a secure database, ideally
var send;

var init = {

	openSocket: function() {
		init.socket = io.connect();
			init.socket.on('connect', function(data) {
				init.socket.emit('join', 'Hello World from client');
			});
			init.socket.on('mongo', function (dbData) {
				send = dbData;
				init.lets();
			});
			init.socket.on('incoming', function (text) {
				console.log(text);
				var t = document.getElementById('new-text');
				t.innerHTML = text;
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
		for (var t = 0; t < 6; t++) {
			var d = document.createElement('div');
			d.setAttribute('class', 'autowords letters hide');
			document.body.appendChild(d);
		}
		document.body.appendChild(a);
		// init.createAutoSlots();
	},

	createAutoSlots: function() {
		// for (var t = 0; t < 6; t++) {
		// 	var j = document.createElement('div');
		//
		// 	j.setAttribute('class', 'letters hide autoword');
		// 	j.
		// }
	},

	autoPopulate: function(arr, type) {
		var show = house.showMessage().split(' ');
		var len = show.length - 1;
		var autoLen;
		var autos = document.getElementsByClassName('autowords');
		if (autos && autos.length > 0) {
			for (var j = 0; j < autos.length; j++) {
				autos[j].setAttribute('class', 'autowords letters hide');
				autos[j].addEventListener('click', function() {
					if (store.message[store.message.length - 1] !== ' ') {
						var update = store.message.join('');
						console.log(update);
						if (update.slice(-1) !== ' ') {
							update = update.split(' ');
						} else {
							update = [update];
						}
						console.log(update);
						update.pop();
						store.message = update;
					}
					store.message.push(' ' + this.innerHTML + ' ');
					for (var f = 0; f < store.message.length; f++) {
						var mes = store.message[f];
						if (mes.slice(-1) !== ' ') {
							mes = mes + ' ';
							store.message[f] = mes;
						}
					}
					// console.log(store.message);
					house.showMessage();


				});
				// document.body.appendChild(autos[j);
			}
		}
		// console.log(store.autoMess);

	},

	fillThoseSlots: function(autos) {
		var els = document.getElementsByClassName('autowords');
		console.log(els);
		console.log(autos);
		console.log(store.x);
		els[store.x].innerHTML = autos;
		els[store.x].setAttribute('class', 'autowords letters');
		++store.x;

		// console.log('filling slots');
		// var els = document.getElementsByClassName('autowords');
		// var msgs = auto;
		// console.log(els, msgs);
		// for (var t = 0; t < msgs.length; t++) {
		// 	els[t].innerHTML = msgs[t];
		// 	els[t].setAttribute('class', 'autowords letters');
		// }

	}
};

var grabs = {
	letters: document.getElementsByClassName('letters'),
	mess: document.getElementById('message'),
	h3: document.getElementById('message'),
};

var house = {

	clearAutoPops: function() {
		var slots = document.getElementsByClassName('autoword');
	},

	getValue: function(pos, val, num) {
		pos.addEventListener('click', function() {
			console.log(store.message);
			if (val === 'backspace') {
				store.message.pop();
			} else if (val === 'send-to') {
				/* some code */
			}
			if (val !== 'backspace' && val !== 'send-to') {
				store.message.push(this.innerHTML);
			}
			if (val !== 'send-to') {
				if (init.hasRun !== true) {
					init.hasRun = true;
					init.autoPopulate();
				}
				var show = house.showMessage();
				console.log('first show: ', show);
				// below is close to workable
				if (show.split(' ').length > 1) {
					show = show[show.length - 1];
					console.log(show);
					console.log(store.message);
				}

				var those = document.getElementsByClassName('autowords');
				for (var d = 0; d < those.length; d++) {
					var th = those[d];
					th.innerHTML = '';
					th.setAttribute('class', 'autowords hide');
				}
				store.x = 0;
				store.autoMess.length = 0;
				for (var f = 0; f < auto.length; f++) {
					var aut = auto[f].phrase;
					// console.log(aut);
					console.log('show:  ', show);
					if (aut.indexOf(show) > -1) {
						store.autoMess.push(aut);
						init.fillThoseSlots(aut);
					}
				}
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
