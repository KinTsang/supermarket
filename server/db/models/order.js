'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('order', {
    priceTotalAtPurchase: {
        type: Sequelize.FLOAT
    },
    status: {
        type: Sequelize.ENUM,
        values: ['open', 'closed'],
        defaultValue: 'open'
    }
}, {
    instanceMethods: {
        // getPrice: function () {
        //     this.
        // }
    },
    classMethods: {
    },
    hooks: {
    }
});
