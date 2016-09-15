'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

//consider required, allowNull for name -- KHJC

module.exports = db.define('order', {
    priceTotalAtPurchase: {
        type: Sequelize.FLOAT
    }
}, {
    instanceMethods: {
    },
    classMethods: {
    },
    hooks: {
    }
});
