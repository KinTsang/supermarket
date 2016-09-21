'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('order', {
    status: {
        type: Sequelize.ENUM,
        values: ['open', 'closed'],
        defaultValue: 'open'
    },
    totalSellPrice: {
        type: Sequelize.FLOAT
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    street: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    zipcode: {
        type: Sequelize.INTEGER
    }
}, {
    instanceMethods: {
         getTotalPrice: function () {
            let prices = [];
             return this.getPowers()
             .then(powers => {
                powers.map(el => {
                    prices.push(el.price);
                })
                return prices;
             })
             .then(prices => {
                var sum = prices.reduce((p,c) => p + c);
                console.log('SUMMMMM', sum);
                return sum;
             })

         }
    },
    classMethods: {
    },
    hooks: {
        // beforeValidate: function (order) {
        //     order.priceTotalAtPurchase = order.getPrice();
        // }
    }
});
