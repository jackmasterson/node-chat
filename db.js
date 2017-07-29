require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;
var mgdb = process.env.MONGO_DB_SID;
var app = require('./app.js');
// Connect to the db
this.refreshDB = function() {
	console.log('refreshing this DB');
	MongoClient.connect(mgdb, function(err, db) {
	  if(!err) {
	    console.log("We are connected");

	    var collection = db.collection('contacts');
	    collection.find().toArray(function(err, items) {
	    	console.log(items);
	    	app.mongo(items);
	    });

	  } else {
	  	console.log('MONGO DB ERROR IS: ', err);
	  }
	}); 
}  

// refreshDB();