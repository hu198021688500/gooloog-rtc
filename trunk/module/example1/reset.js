var http = require("http");
http.createServer(
	function(req, res) {
		var util = require('util');
		/*var rest = require('restler');
		rest.get('http://192.168.31.188:7474/db/data/node/1',
			{
				headers: { 'Content-Type': 'application/json' },
				username : 'root',
				password : 'admin'
			}
		).on('complete', function(data) {
			console.log(data);
		});*/
		
		
		var neo4j = require('neo4j');
		var db = new neo4j.GraphDatabase('http://root:admin@192.168.31.188:7474');
		var node  = db.getNodeById(1);
		console.log(node.id);
		
		/*var neo4j = require('node-neo4j');
	    var db = new neo4j('http://root:admin@192.168.31.188:7474');
	    db.readNode(1, function(err, node){
	        if(err) throw err;
	        // Output node properties.
	        console.log(node.data);
	        // Output node id.
	        console.log(node.id);
	    });*/
		
		res.end("Hello World\n");
	}).listen(8083, "127.0.0.1");

console.log("Server running at http://127.0.0.1:8083/");