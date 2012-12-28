var http = require("http");
http.createServer(
	function(req, res) {
		res.writeHead(200, {
			"Content-Type" : "text/plain"
		});
		// 连接数据库
		var sys = require("sys");
		//process.uptime()
		var os = require("os");
		var startTime = os.uptime();
		var mysql = require("mysql");
		var connection = mysql.createConnection({
			host : "192.168.31.188",
		    user : "root",
		    password : "admin",
		});
		connection.connect();
		connection.query("USE test");
		
		//insert 10000 to mysql
		//0.68630218505859 - 0.5818030834198 - 0.67546606063843   php
		//4.482927448000737 - 4.353976828000668 - 4.551052707999588  nodejs
		for (var i = 0; i < 10000; i++) {
			var values = [ "Chad" + i, "Lung" + i, "Hello World" + i ];
			connection.query("INSERT INTO node SET firstname = ?, lastname = ? , message = ?", values);
//			connection.query("INSERT INTO node SET firstname = ?, lastname = ? , message = ?", values,
//				function(error, results) {
//					if (error) {
//						console.log("ClientReady Error: " + error.message);
//						client.end();
//						return;
//					}
//					console.log("Inserted: " + results.affectedRows + " row.");
//					console.log("Id inserted: " + results.insertId);
//				}
//			);
		}
		connection.end();
		console.log(os.uptime() - startTime);
		/*
		client.query("SELECT * FROM MyTable",
			function selectCb(error, results, fields) {
				if (error) {
					console.log("GetData Error: " + error.message);
					client.end();
					return;
				}
				if (results.length > 0) {
					var firstResult = results[0];
					console.log("First Name: " + firstResult["firstname"]);
					console.log("Last Name: " + firstResult["lastname"]);
					console.log("Message: " + firstResult["message"]);
				}
			}
		);
		*/
		connection.end();
		console.log("Connection closed");
		
		res.end("Hello World\n");
	}
).listen(8083, "127.0.0.1");

console.log("Server running at http://127.0.0.1:8083/");





