'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('category', {
    name: {
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
