'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

//consider required, allowNull for name -- KHJC

module.exports = db.define('power', {
    active: { //consider status vs active so that it is more robust than 2 choices (draft mode, inReview, legal disable, etc); not necessary but things to consider when making tables -- KHJCND
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT //consider max size -- KHJCND
    },
    price: {
        type: Sequelize.FLOAT
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    picUrl: {
        type: Sequelize.STRING //we have to have a default based on specs, also there is an isUrl validation that sequelize has if you want to use that -- KHJC
    }
}, {
    instanceMethods: {
    },
    classMethods: {
    },
    hooks: {
    }
    // defaultScope for default inclusion of categories, if you feel it is necessary to include an attribute (an association) everytime -- KHJC
});
