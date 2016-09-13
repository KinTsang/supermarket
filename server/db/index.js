'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var Category = require('./models/category');
var Order = require('./models/order');
var Power = require('./models/power');
var Review = require('./models/review');
var User = require('./models/user');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

// TODO: add product belongsToMany categories
// TODO: add order belongs to either user OR guest session
