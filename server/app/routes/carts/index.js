'use strict';
var chalk = require('chalk');
var router = require('express').Router(); // eslint-disable-line new-cap
var Models = require('../../../db');
var Order = Models.Order;
var Power = Models.Power;
var PowerOrder = Models.PowerOrder;
module.exports = router;

router.get('/', function(req, res) {

    let result = [];

    if (req.session.passport.user) {
        let userId = req.session.passport.user;
        Order.findOne({
            where: {
                userId: userId,
                status: 'open'
            }
        })
        .then((order) => {
            if (!order) {
                res.send([]);
                return;
            } 
            return PowerOrder.findAll({
                where: {
                    orderId: order.id
                }
            });
        })
        .then((powerorders) => {
            powerorders.map((elem) => {
                result.push({
                    powerId: elem.powerId,
                    quantity: elem.quantity
                });
            });
            return Promise.all(powerorders.map((elem) => {
                return Power.findOne({ where: { id: elem.powerId } });
            }));
        })
        .then((powers) => {
            powers.map((elem, idx) => {
                result[idx].powerName = elem.name;
            });
            res.send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
    } else {
        if (!req.session.cart) {
            res.send([]);
            return;
        }
        let cart = req.session.cart;
        return Promise.all(cart.map((elem) => {
            return Power.findOne({ where: { id: elem.powerId } });
        }))
        .then((powers) => {
            //console.log(chalk.magenta(JSON.stringify(powers)));
            powers.map((elem, idx) => {
                result.push({
                    powerId: cart[idx].powerId,
                    powerName: elem.name,
                    quantity: cart[idx].quantity
                });
            });
            res.send(result);
            return;
        })
        .catch((err) => {
            res.status(400).send(err);
            return;
        });
    }

})

// TODO: a quantity of 0.2 doesn't error.

// Sets qunatity of power in cart.
router.put('/', function(req, res) {

    let aPowerId = Number(req.body.powerId);
    let newQuantity = Number(req.body.quantity);

    if (req.session.passport.user) {
        // Create or update exiting order for this user.
        // Create or update existing power for this user's order.
        let userId = req.session.passport.user; 
        Order.findOne({
            where: {
                userId: userId,
                status: 'open'
            }
        })
        .then((order) => {
            if (!order) throw new Error;
            return PowerOrder.findOne({
                where: {
                    orderId: order.id,
                    powerId: aPowerId
                }
            });
        })
        .then((powerorder) => {
            if (!powerorder) throw new Error;
            powerorder.quantity = newQuantity;
            return powerorder.save();
        })
        .then(() => res.send())
        .catch((err) => {
            res.status(400).send(err);
        });
    } else {
        if (!req.session.cart) {
            res.status(400).send();
            return;
        }
        let cart = req.session.cart;
        let idx = cart.findIndex((elem) => {
            return elem.powerId === aPowerId;
        });
        if (idx < 0) {
            res.status(400).send();
            return;
        }
        cart[idx].quantity = newQuantity;
        res.send();
    }
});

// Adds quantity to power in cart.
router.post('/', function(req, res) {

    // TODO: add powerId validation.
    let newPowerId = Number(req.body.powerId);
    let newQuantity = Number(req.body.quantity);

    if (req.session.passport.user) {
        // Create or adds to exiting order for this user.
        // Create or adds to existing power for this user's order.
        let userId = req.session.passport.user;
        Order.findOrCreate({
            where: {
                userId: userId,
                status: 'open'
            }
        })
        .spread((order, created) => {
            return PowerOrder.findOrCreate({
                where: {
                    orderId: order.id,
                    powerId: newPowerId
                }
            });
        })
        .spread((powerorder, created) => {
            powerorder.quantity += newQuantity;
            return powerorder.save();
        })
        .then(() => res.send())
        .catch((err) => {
            res.status(400).send(err);
        });
    } else {
        // Not logged in. Edit only cart in session.
        // Cart in session will update db upon login.
        if (!req.session.cart)
            req.session.cart = [];
        let cart = req.session.cart;
        let idx = cart.findIndex((elem) => {
            return elem.powerId === newPowerId;
        });
        if (idx >= 0) {
            cart[idx].quantity += newQuantity;
        } else {
            cart.push({
                powerId: newPowerId,
                quantity: newQuantity
            });
        }
        res.send();
    }

});

// Removes a power from cart.
router.delete('/', function(req, res) {

    let aPowerId = Number(req.body.powerId);

    if (req.session.passport.user) {
        let userId = req.session.passport.user;
        Order.findOne({
            where: {
                userId: userId,
                status: 'open'
            }
        })
        .then((order) => {
            if (!order) {
                res.status(400).send();
                return;
            } 
            return PowerOrder.findOne({
                where: {
                    orderId: order.id,
                    powerId: aPowerId
                }
            });
        })
        .then((powerorder) => {
            return powerorder.destroy();
        })
        .then(() => {
            res.send();
        })
        .catch((err) => {
            res.status(400).send(err);
        });
    } else {
        if (!req.session.cart) {
            res.status(400).send();
            return;
        }
        let cart = req.session.cart;
        let idx = cart.findIndex((elem) => {
            return elem.powerId === aPowerId;
        });
        if (idx < 0) {
            res.status(400).send();
            return;
        }
        cart.splice(idx, 1);
        res.send();
    }

});
