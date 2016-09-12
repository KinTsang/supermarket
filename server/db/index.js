'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var Product = require('./models/product');
var User = require('./models/user');
var Order = require('./models/order');
var Review = require('./models/review');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

// TODO: add product belongsToMany categories
// TODO: add order belongs to either user OR guest session