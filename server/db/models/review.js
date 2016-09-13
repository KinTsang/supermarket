'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {
    description: {
        type: Sequelize.TEXT
    },
    rating: {
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
