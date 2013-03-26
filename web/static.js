/**
 * New node file
 */

var fs = require("fs");
var url = require("url");
var path = require("path");
var http = require("http");

var directory = '/jquery';
var server = http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname.replace(/\.\./g, "");
	var realPath = __dirname + directory + pathname;
	response.write(realPath);
    response.end();
    /*
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write("Hello World");
	response.end();*/

});

server.listen(3001);

console.log("Server runing at port: " + 3001 + ".");
