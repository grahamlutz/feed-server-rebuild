var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var bodyparse = require('body-parser');
var mongoose = require('mongoose');

var app = express();

/*
 *  Database connection
 */

require('./models/products');
//mongoose.Promise = global.Promise;
var dbConfig = require('./config/db-connection')
mongoose.connect(dbConfig.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + dbConfig.mongoURI[app.settings.env]);
  }
});

/*
 * Middleware
 */

 // logger
 // create a write stream (in append mode)
 var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
 // setup the logger
 app.use(logger('combined', {stream: accessLogStream}))
 app.use(logger('dev'));
 app.use(express.static(__dirname + '../public'));
 app.engine('html', require('ejs').renderFile);
 app.set('view engine', 'html');

/*
 *  Port Setup
 */

app.set('port', 5000);
app.listen(app.get('port'));

/*
 *  Routes
 */

var routes = require('./routes');
app.use('/', routes);

/*
 *  Error Handlers
 */

 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
 });

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// don't print stacktraces for user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
