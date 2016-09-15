var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/refresh', function(req, res, next) {
  var bodyContent = '';

  http.get('http://storage1.merchantadvantage.com/macm2543/AllRegionProducts.txt').on('response', function (response) {
    response.on('data', function (chunk) {
        bodyContent += chunk;
    });
    response.on('end', function (data) {
        var lines = bodyContent.split('\n');
        var result = [];
        var headers=lines[0].split("\t");

        for( var i=1; i<lines.length; i++ ){

      	  var obj = {};
      	  var currentline=lines[i].split("\t");

      	  for( var j=0; j<headers.length; j++){
      		  obj[headers[j]] = currentline[j];
      	  }

      	  result.push(obj);
        }
        console.log(result[0])
        res.write("hello");
        res.end();
    }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
    })
  });
});

module.exports = router;
