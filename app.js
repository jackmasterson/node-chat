require('dotenv').config();
var express = require('express');
var db = require('./db.js');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var mess = [];
var port = process.env.PORT || 7094;
var that = this;
server.listen(port);

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/views/login.html');
  io.on('connection', function(client) {  

    console.log('Client connected with user info');
    client.on('login-now', function(userInfo) {
        // submitLogin(userInfo);
        if (userInfo.un === process.env.USERNAME && userInfo.pw === process.env.PASS) {
            console.log('made it, where to go from here?');
            // app.post('/home', function(req, res) {
             app.get('/home', function(req, res) {
                res.sendFile(__dirname + '/views/index.html');
              });
             this.emit('logged-in', true);
            
            // });
        }
    });
  });
});




app.get('/add-contact', function(req, res) {
    res.sendFile(__dirname + '/views/contact.html');
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
app.use("/auto.js", express.static(__dirname + '/auto.js'));

this.refresh = function(dbInfo) {
    io.on('connection', function(client) {
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

        });

        client.emit('mongo', dbInfo);

        client.on('message', function(info) { 
            mess.length = 0;
            mess.push(info);
        });

        client.on('add-contact', function(cont) {
            db.addInfo(cont);
        });

        client.on('removeThisContact', function(cont) {
            db.remInfo(cont);
        });
        client.on('destination', function(data) {
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

