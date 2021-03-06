'use strict';
var Sequelize = require('sequelize');
var db = require('./_db');

// eslint-disable-next-line no-unused-vars
var Category = require('./models/category');
var Order = require('./models/order');
var Power = require('./models/power');
var Review = require('./models/review');
var User = require('./models/user');
// var Session = db.model('Sessions');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

// TODO: add product belongsToMany categories
// TODO: add order belongs to either user OR guest session

var PowerCategory = db.define('power_category');
var PowerOrder = db.define('power_order', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    priceAtPurchase: {
        type: Sequelize.FLOAT,
    }
});

Power.belongsToMany(Category, { through: PowerCategory });
Category.belongsToMany(Power, { through: PowerCategory });

Power.belongsToMany(Order, { through: PowerOrder });
Order.belongsToMany(Power, { through: PowerOrder });

Order.belongsTo(User);
User.hasMany(Order);

Review.belongsTo(Power);
Power.hasMany(Review);

Review.belongsTo(User);
User.hasMany(Review);

// Order.belongsTo(Session);
// Session.hasOne(Order);

module.exports = {
    db: db,
    //not necessary because of db -> var Power = db.model('power');
    Category: Category,
    Order: Order,
    Power: Power,
    PowerCategory: PowerCategory,
    PowerOrder: PowerOrder,
    Review: Review,
    User: User
 }
