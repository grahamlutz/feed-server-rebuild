process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server');
var Product = mongoose.model('Product');

chai.use(chaiHttp);

describe('Products', function() {


});
