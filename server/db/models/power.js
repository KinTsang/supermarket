'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('power', {
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        //allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        //allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        //allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        //allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    picUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://unsplash.it/200/300/?random'
    }
}, {
    instanceMethods: {
    },
    classMethods: {
    },
    hooks: {
    }
});
