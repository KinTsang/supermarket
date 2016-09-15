'use strict';
var chalk = require('chalk');
var router = require('express').Router(); // eslint-disable-line new-cap
var Models = require('../../../db');
var Order = Models.Order;
var PowerOrder = Models.PowerOrder;
module.exports = router;

router.post('/', function(req, res) {
    res.send([
        { powerId: 1, quantity: 2 },
        { powerId: 2, quantity: 1 },
        { powerId: 3, quantity: 1 }
    ]);
    // console.log(chalk.magenta('req.body: ' + JSON.stringify(req.body)));
    // console.log(chalk.magenta('req.session: ' + JSON.stringify(req.session)));
    // if (!req.session.cart) {
    //     req.session.cart = [];
    // }
    // let cart = req.session.cart;
    // let powerId = req.body.powerId;
    // let quantity = Number(req.body.quantity);
    // let index = cart.findIndex((elem) => (elem.powerId === powerId));
    // if (index >= 0) {
    //     cart[index].quantity = Number(cart[index].quantity) + quantity;
    // } else {
    //     cart.push({
    //         powerId: powerId,
    //         quantity: quantity
    //     });
    // }
    // console.log(chalk.magenta(JSON.stringify(req.session.cart)));
    // res.status(200).send();
});
