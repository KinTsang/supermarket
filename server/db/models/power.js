'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('power', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    quantity: {
        type: Sequelize.INTEGER
    }
}, {
    instanceMethods: {
    },
    classMethods: {
    },
    hooks: {
    }
});
