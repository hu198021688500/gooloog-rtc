var http = require("http");
http.createServer(
	function(req, res) {
		res.writeHead(200, {
			"Content-Type" : "image/jpeg"
		});
		var gm = require('gm');
		
		gm('/home/mohadoop/IMG_X.jpg').resize(200,200).fontSize(14).drawText(10, 10, 'molifang' ,'southeast').compress('JPEG').stream(function (err, stdout, stderr) {
		  stdout.pipe(res);
		});
	}).listen(8083, "127.0.0.1");

console.log("Server running at http://127.0.0.1:8083/");