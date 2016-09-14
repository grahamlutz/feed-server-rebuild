process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../mserver');
var Product = mongoose.model('Products');

chai.use(chaiHttp);

describe('Products', function() {


});
