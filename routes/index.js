var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Products');

/* GET /refresh - refresh the db with product data. */
router.get('/refresh', function(req, res, next) {
  var bodyContent = '';

  http.get('http://storage1.merchantadvantage.com/macm2543/AllRegionProducts.txt').on('response', function (response) {

    response.on('data', function (chunk) {
        bodyContent += chunk;
    });

    response.on('end', function (data) {

        var lines = bodyContent.split('\n');
        //console.log('lines: ', lines);
        var result = [];
        var headers = lines[0].split("\t");
        //console.log('headers: ', headers);

        for( var i=1; i<lines.length; i++ ){

      	  var obj = {};
      	  var currentline = lines[i].split("\t");

      	  for( var j=0; j<headers.length; j++){
      		  obj[headers[j]] = currentline[j];
      	  }

      	  result.push(obj);

          var product = new Product(result[i-1]);

          product.save(function(err, product) {
            if (err) return next(err);
          });
        }

        res.end("Success! " + result.length + " products updated.");
    }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
    })
  });
});

/* GET all products */
router.get('/products', function(req, res, next) {
  console.log('router.get /products');
   Product.find(function(err, gear) {
     if (err) return next(err);
     res.json(gear);
   })
 });

module.exports = router;
