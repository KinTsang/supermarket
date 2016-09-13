'use strict';
var Sequelize = require('sequelize');
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

var PowerCategory = db.define('power_category');
var PowerOrder = db.define('power_order', {
    quantity: {
        type: Sequelize.INTEGER
    },
    priceAtPurchase: {
        type: Sequelize.FLOAT
    }
});

Power.belongsToMany(Category, { through: PowerCategory });
Power.belongsToMany(Order, { through: PowerOrder });
Order.belongsTo(User);
Review.belongsTo(Power);
Review.belongsTo(User);