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
        res.write(bodyContent);
        res.end();
    }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
    })
  });
});

module.exports = router;
