'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('order', {
    price: {
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
