'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('power', {
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    price: {
        type: Sequelize.FLOAT
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    picUrl: {
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
