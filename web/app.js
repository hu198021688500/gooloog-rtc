var express = require('express');
var app = express();

var directory = '/jquery';

app.configure(function(){
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(app.router);
	app.set('view engine', 'jade');
	app.set('views', __dirname + directory);
	app.set('view options', {layout: false});
	app.set('basepath',__dirname + directory);
});

app.configure('development', function(){
	app.use(express.static(__dirname + directory));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	var oneYear = 31557600000;
	app.use(express.static(__dirname + directory, { maxAge: oneYear }));
	app.use(express.errorHandler());
});

console.log("Web server has started.\nPlease log on http://127.0.0.1:3001/index.html");
app.listen(3001);
