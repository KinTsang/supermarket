'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {
    description: {
        type: Sequelize.TEXT
    }
}, {
    instanceMethods: {
    },
    classMethods: {
    },
    hooks: {
    }
});
