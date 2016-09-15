'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

//consider required, allowNull for name -- KHJC

module.exports = db.define('review', {
    description: {
        type: Sequelize.TEXT
    },
    rating: {
        type: Sequelize.INTEGER //any integer? or is there a range, maybe this is enum, or min/max validations? -- KHJC
    }
}, {
    instanceMethods: {
    },
    classMethods: {
    },
    hooks: {
    }
});
