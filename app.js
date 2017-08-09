require('dotenv').config();
var express = require('express');
var db = require('./db.js');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var bodyParser = require('body-parser');

var mess = [];
var port = process.env.PORT || 7094;
var that = this;
server.listen(port);
app.use(bodyParser.urlencoded({extended: false}));
app.post("/messages", function (request, response) {
  console.log(request.body);
  console.log(request.body.Body);
  var text = request.body.Body;
  io.on('connection', function(client) {
    client.emit('incoming', text);
  });
});
app.get('/login', function (req, res, next) {
  res.sendFile(__dirname + '/views/login.html');
  io.on('connection', function(client) {

    console.log('Client connected with user info');
    client.on('login-now', function(userInfo) {
        // submitLogin(userInfo);
        if (userInfo.un === process.env.USERNAME && userInfo.pw === process.env.PASS) {
            console.log('made it, where to go from here?');
            // app.post('/home', function(req, res) {
             app.get('/', function(req, res) {
                res.sendFile(__dirname + '/views/index.html');
              });
             this.emit('logged-in', true);
             db.refreshDB();

            // });
        }
    });
  });
});




app.get('/add-contact', function(req, res) {
    res.sendFile(__dirname + '/views/contact.html');
});

app.get('/messages', function(req, res) {
    res.sendFile(__dirname + '/views/messages.html');
});

app.get('/send-to', function(req, res) {
    res.sendFile(__dirname + '/views/send.html');
});

app.use("/css", express.static(__dirname + '/css'));
app.use("/js/script.js", express.static(__dirname + '/js/script.js'));
app.use("/js/send.js", express.static(__dirname + '/js/send.js'));
app.use("/js/login.js", express.static(__dirname + '/js/login.js'));
app.use("/js/contact.js", express.static(__dirname + '/js/contact.js'));
app.use("/keyboard.js", express.static(__dirname + '/keyboard.js'));
app.use("/messages.js", express.static(__dirname + '/messages.js'));
app.use("/auto.js", express.static(__dirname + '/auto.js'));

this.refresh = function(dbInfo) {
    io.on('connection', function(client) {
      console.log(client);
      console.log(dbInfo);
        client.emit('mongoUpdate', dbInfo);
    });
};

this.mongo = function(dbInfo) {
    console.log('running this dot mongo');
    io.on('connection', function(client) {

        console.log('Client connected in this dot mongo');
        // client.on('login-now', function(userInfo) {
        //     submitLogin(userInfo);
        // });

        client.on('join', function(data) {
          console.log(data);
        });

        client.emit('mongo', dbInfo);

        client.on('message', function(info) {
            mess.length = 0;
            mess.push(info);
            console.log('info is: ', info);
        });

        client.on('add-contact', function(cont) {
          console.log('cont is : ', cont);
            db.addInfo(cont);
        });

        client.on('removeThisContact', function(cont) {
            db.remInfo(cont);
        });
        client.on('destination', function(data) {
            console.log('made it to twilio with data: ', data);
            console.log('made it to twilio with message: ', mess[0]);
            console.log('made it to twilio with from: ', from);
            var twilio = require('twilio');
            var accountSid = process.env.TWILIO_ACCOUNT_SID;
            var authToken = process.env.TWILIO_ACCOUNT_AUTH;
            var from = process.env.TWILIO_ACCOUNT_NUM;
            var client = new twilio(accountSid, authToken);

            client.messages.create({
                body: mess[0],
                to: data,
                from:  from
            });

        });
    });
}
