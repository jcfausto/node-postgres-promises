var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
//Swagger definitions
var swaggerDefinition = {
  info: {
    title: 'API Description',
    version: '1.0.0',
    description: 'API description using swagger.',
  },
  host: 'localhost:3000',
  basePath: '/',
};

//Swagger options
var options = {
  //import swagger definitions
  swaggerDefinition: swaggerDefinition,
  //path to the API docs
  apis: ['./routes/*.js'],
};

//Initializa swagger
var swaggerSpec = swaggerJSDoc(options);

//Servine swagger docs
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler: serving up json format
// error handler: serving up json format
if (app.get('env') === 'development') {
  //Will print the stack trace
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    //res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    //res.status(err.status || 500);
    //res.render('error');

    res.status(err.code || 500)
      .json({
        status: 'error',
        message: err
      });
  });
}

//Production will have no stack traces
app.use(function(err, req, res, next) {
  res.status(err.code || 500)
    .json({
      status: 'error',
      message: err.message
    });
});

module.exports = app;
