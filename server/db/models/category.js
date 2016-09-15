'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

//consider required, allowNull for name -- KHJC

module.exports = db.define('category', {
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    name: {
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
