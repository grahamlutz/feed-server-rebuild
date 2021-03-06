var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Products');
mongoose.Promise = global.Promise;

/* GET /refresh - refresh the db with product data. */
router.get('/refresh', function(req, res, next) {
  var bodyContent = '';

  http.get('http://storage1.merchantadvantage.com/macm2543/AllRegionProducts.txt').on('response', function (response) {

    response.on('data', function (chunk) {
        bodyContent += chunk;
    });

    response.on('end', function (data) {
        console.log('response.on end');
        // Empty the DB before processing
        Product.remove({}, function(err) {
           console.log('collection removed')
        });

        // Convert txt file from tab delimited to an Array
        var lines = bodyContent.split('\n');
        var result = [];
        // Separate out headers
        var headers = lines[0].split("\t");

        // Convert each row to an object
        for( var i=1; i<lines.length; i++ ){

      	  var obj = {};
      	  var currentline = lines[i].split("\t");

      	  for( var j=0; j<headers.length; j++){
      		  obj[headers[j]] = currentline[j];
      	  }

          // Push subsequent rows into results Array.
      	  result.push(obj);

          // Save each product object to database
          var product = new Product(result[i-1]);

          product.save(function(err, product) {
            if (err) return next(err);
            console.log('product saved');
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
   Product.find(function(err, products) {
     if (err) return next(err);
     res.json(products);
   })
});

 /* GET textsearch */
router.get('/api/feed', function(req, res, next) {

  let textSearch    = req.query.textsearch   || null;
  let broadSearch   = req.query.broadsearch  || null
  let booleanSearch = req.query.booleanearch || null
  let orderBy       = req.query.orderby      || 'id';
  let limit         = req.query.limit        || 10
  console.log(req.query.limit);

  let findObj =  textSearch ? {$text: {$search: textSearch}} : {};

  let query = Product.find(findObj);

  query.limit(limit);
  query.sort({orderBy:-1});


  // Product.find({$text: {$search: textSearch}})
  query.exec(function(err, docs) { 
    res.json(docs);
  });
});


module.exports = router;
