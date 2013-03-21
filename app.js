
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , nodemailer = require("nodemailer");

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var transport = nodemailer.createTransport("SMTP", {
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/work', function(req, res) {
  res.render('index', {title: 'Work Page', className: 'work', pageNumber: '1', errorMessage: ''})
});
app.get('/contact', function(req, res) {
  res.render('index', {title: 'Contact Page', className: 'contact', pageNumber: '2', errorMessage: ''})
});

app.post('/contact', function(req, res){
	
	var msgErr = '';
	var classErr = 'contact';
	
	if(req.body.user.name === ''){
		msgErr += 'Name is required ! ';
	};
	if (req.body.user.email === '') {
		msgErr += 'Email is required ! ';
	} else if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,6}$/.test(req.body.user.email) === false) {
		msgErr += 'Please, enter a valid email ! ';
	};
	if(req.body.user.message === ''){
		msgErr += 'Message is required ! ';
	};
	if (msgErr === ''){
		var senderName = req.body.user.name;
		var senderEmail = req.body.user.email;
		var senderMessage = req.body.user.message;
		
		var mailOptions = {
		    to: process.env.GMAIL_USERNAME, // list of receivers
		    subject: "Contact Form from " + senderName + " " + senderEmail, // Subject line
		    text: senderMessage // plaintext body
		}
		transport.sendMail(mailOptions, function(error, response){
		    if(error){
		        console.log(error);
		    }else{
		        console.log("Message sent: " + response.message);
		    }
		});
		msgErr = 'Thank you, your message has been sent!'
		classErr = 'contact'
	} else {
		classErr = 'contact';
	};
	console.log(msgErr);
	res.render('index', {
		title: 'Contact Page', className: classErr, pageNumber: '2', errorMessage: msgErr
	});

    
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
