var http = require("http");
http.createServer(
	function(req, res) {
		var gm = require('gm');
		var fs = require('fs');
		gm('/home/mohadoop/IMG_20120723_084937.jpg').resize('200', '200').stream(
			function (err, stdout, stderr) {
				var writeStream = fs.createWriteStream('/home/mohadoop/IMG_X.jpg');
				//stdout.pipe(writeStream);
				process.stdout.write(stdout);
		});
		
//		var readStream = fs.createReadStream('/path/to/my/img.jpg');
//		gm(readStream, 'img.jpg').write('/path/to/reformat.png', function (err) {
//			if (!err) console.log('done');
//		});
		
		res.end("Hello World\n");
	}
).listen(8083, "127.0.0.1");

console.log("Server running at http://127.0.0.1:8083/");