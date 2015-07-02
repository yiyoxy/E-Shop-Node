var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var port = process.env.PORT||3000;
var app = express();
var dbUrl = 'mongodb://localhost:12345/shop'

mongoose.connect(dbUrl);



app.set('views','./app/views/pages');
app.set('view engine','jade');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser());
app.use(session({
	secret:'shop',
	store:new MongoStore({
		url:dbUrl,
		collection:'sessions'
	})
}));

if('development'===app.get('env')){
	app.set('showStackError',true)
	app.use(morgan(':method :url :status'))
	app.locals.pretty = true;
	mongoose.set('debug',true)
}

require('./config/route')(app)
app.locals.moment = require('moment');

app.listen(port);

console.log("server start on port"+port)

