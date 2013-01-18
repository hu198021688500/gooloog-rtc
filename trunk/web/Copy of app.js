var http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs");

http.createServer(function(req, res) {
	var pathname = __dirname + "/mobile/ratchet" + url.parse(req.url).pathname;
	if (pathname.charAt(pathname.length - 1) == "/") {
		pathname += "index.html";
	}
	//var mime = require('mime');
	//mime.define({
	//    'text/x-some-format': ['x-sf', 'x-sft', 'x-sfml'],
	//    'application/x-my-type': ['x-mt', 'x-mtt'],
	//    // etc ...
	//});
	//mime.lookup('/path/to/file.txt');//'text/plain'
	//mime.extension('text/html');// => 'html'
	//mime.charsets.lookup('text/plain');        // => 'UTF-8'
	fs.exists(pathname, function(exists) {
		if (exists) {
			switch (path.extname(pathname)) {
				case ".html" :
					res.writeHead(200, {"Content-Type" : "text/html"});
					break;
				case ".js" :
					res.writeHead(200, {"Content-Type" : "text/javascript"});
					break;
				case ".css" :
					res.writeHead(200, {"Content-Type" : "text/css"});
					break;
				case ".gif" :
					res.writeHead(200, {"Content-Type" : "image/gif"});
					break;
				case ".jpg" :
					res.writeHead(200, {"Content-Type" : "image/jpeg"});
					break;
				case ".png" :
					res.writeHead(200, {"Content-Type" : "image/png"});
					break;
				default :
					res.writeHead(200, {"Content-Type" : "application/octet-stream"});
			}

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