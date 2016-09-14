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
    var i = 0;
    response.on('data', function (chunk) {
        i++;
        bodyContent += chunk;
    });
    response.on('end', function () {
        res.write(JSON.stringify(bodyContent));
    }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
    })
  });
});

module.exports = router;
