var computecluster = require('compute-cluster');
var cc = new computecluster({
	module : './test.js',
	max_backlog : -1
});

var toRun = 10;

var http = require('http');
http.createServer(function(req, res) {
	// then you can perform work in parallel
	for (var i = 0; i < toRun; i++) {
		cc.enqueue({}, function(err, r) {
			if (err) {
				console.log("an error occured:", err);
			} else {
				//console.log("it's nice:", r);
			}
			if (--toRun === 0) {
				cc.exit();
			};
		});
	};
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	res.end('Hello World\n');
}).listen(8085);
console.log('Server running at http://127.0.0.1:1337/');