'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('order', {
    priceTotalAtPurchase: {
        type: Sequelize.FLOAT
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'in-cart'
    },
    shippingStreet: {
      type: Sequelize.STRING
    },
    shippingZip: {
      type: Sequelize.STRING
    },
    shippingState: {
      type: Sequelize.STRING
    },
    shippingCity: {
      type: Sequelize.STRING
    },
    shippingApartment: {
      type: Sequelize.INTEGER
    },
    sessionId: {
      type: Sequelize.STRING
    }
}, {
    instanceMethods: {
    },
    classMethods: {
    },
    hooks: {
    }
});
