var fs = require("fs");
var	url = require("url");
var	path = require("path");
var mime = require('mime');
var http = require("http");

http.createServer(function(req, res) {
	var pathname = __dirname + "/mobile/html" + url.parse(req.url).pathname;
	if (pathname.charAt(pathname.length - 1) == "/") {
		pathname += "index.html";
	}
	fs.exists(pathname, function(exists) {
		if (exists) {
			res.writeHead(200, {"Content-Type" : mime.lookup(pathname)});
			fs.readFile(pathname, function(err, data) {
				res.end(data);
			});
		} else {
			res.writeHead(404, {"Content-Type" : "text/html"});
			res.end("<h1>404 Not Found</h1>");
		}
	});
}).listen(8080, "192.168.31.188");

console.log("Server running at http://127.0.0.1:8080/");