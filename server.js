var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var bodyparse = require('body-parser');
var mongoose = require('mongoose');

var app = express();

/*
 *  Database connection
 */

require('./models/Products');
//mongoose.Promise = global.Promise;
var dbConfig = require('./config/db-connection')
mongoose.connect(dbConfig.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + dbConfig.mongoURI[app.settings.env]);
  }
});
