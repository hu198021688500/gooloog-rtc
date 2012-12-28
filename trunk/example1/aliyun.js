var http = require("http");
http.createServer(function(req, res) {
	var api = require('aliyun').api;
	var oss = new api.OSS();
	//创建bucket
	// oss.putBucket('hugb1',function(response){
	// console.log(response.statusCode);
	// });
	//上传文件
	var fs = require('fs');
	var data = fs.readFileSync('/home/mohadoop/MyEclipse 10/node_modules/aliyun/tests/object.js', 'utf8');
	//util.testDebugOutput('testPutObject', 'data', data);
	oss.putObject({
		'Content-Length' : data.length,
		'Content-Type' : 'text/plain',
	}, 'hugb', 'objecttest', data, function(response) {
		console.log(response.statusCode);
	});

	res.end("Hello World\n");
}).listen(8083, "127.0.0.1");

console.log("Server running at http://127.0.0.1:8083/");