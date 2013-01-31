/**
 * New node file
 */

var x = require('../lib/object.js');

exports.test1 = function(test) {
	var object = {xc:'xcx',e:[1,23,2],g:function(){console.log(1);}};
	var xx = require('util');
	console.log(xx.inspect(object));
	console.log(x.isArray([]));
	console.log(x.isArray({}));
	test.equal(1, 1);
	test.done();
};