/**
 * New node file
 */

/*var x = require('../lib/object.js');

exports.test1 = function(test) {
	var object = {xc:'xcx',e:[1,23,2],g:function(){console.log(1);}};
	var xx = require('util');
	console.log(xx.inspect(object));
	console.log(x.isArray([]));
	console.log(x.isArray({}));
	test.equal(1, 1);
	test.done();
};*/
var port = 6379;
var host = '192.168.20.203';

var redis = require("redis");
var client = redis.createClient(port, host);

client.on("error", function (err) {
    console.error("Redis Connect Error: " + err.stack);
    process.exit();
});

client.info(function(err, result){
	var data = {};
	var info = result.split("\r\n");
	for (var key in info) {
		var line = info[key].split(":");
		console.log(line[0] + "===" + line[1]);
		data[line[0]] = line[1];
	}
	console.log(result);

	//内存
	console.log(data["used_memory"]);
	//内存消耗峰值
	console.log(data["used_memory_peak"]);
	
	console.log(data["rdb_last_save_time"]);
	console.log(data["rdb_changes_since_last_save"]);
	
	console.log(data["master_link_status"]);
	
	console.log(data["latest_fork_usec"]);
	console.log(data["rdb_last_save_time"]);
	console.log(data["rdb_last_save_time"]);
	console.log(data["rdb_last_save_time"]);
});