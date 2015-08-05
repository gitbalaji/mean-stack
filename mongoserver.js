//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var http = require('http');


//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var urlHost = 'mongodb://localhost:27017/test';

// Use connect method to connect to the Server


http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
	  'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true
  });
  
  MongoClient.connect(urlHost, function (err, db) {
	  	if (err) {
	    	console.log('Unable to connect to the mongoDB server. Error:', err);
	  	} 
	  	else {
	    	//HURRAY!! We are connected. :)
	    	console.log('Connection established to', urlHost);

	    	// do some work here with the database.
			   findOrders(db, res);

	  	}
	});
}).listen(3100);

var findOrders = function(db, res) {
   var cursor =db.collection('orders').find( );

   cursor.toArray(function(err, docs) {
      if (docs != null) {
        res.end(JSON.stringify(docs));
      } 
      db.close();
   });
};