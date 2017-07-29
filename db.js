require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;
var mgdb = process.env.MONGO_DB_SID;
var app = require('./app.js');
// Connect to the db
function refreshDB () {
	MongoClient.connect(mgdb, function(err, db) {
	  if(!err) {
	    console.log("We are connected");

	    var collection = db.collection('contacts');
	    collection.find().toArray(function(err, items) {
	    	console.log(items);
	    	app.mongo(items);
	    });

	  }
	}); 
}  

refreshDB();