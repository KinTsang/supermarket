'use strict'

const express = require('express');
const router = express.Router();
const Model = require('../../../db');
const User = Model.User;

const Order = Model.Order;
const Power = Model.Power;
//sign up: create new user

router.post('/', function (req, res, next) {
  User.create(req.body)
    .then(foundUser => res.status(201).send(foundUser))
    .catch(next);
});

router.get('/orders', function(req, res, next){
  if (req.query.OrderId) {
    Power.findAll({
      include: [{
        model: Order,
        where: {
        id: req.query.OrderId
      }
      }]
  })
    .then(function(allOrderDetail) {
      res.send(allOrderDetail);
    })
    .catch(next)
  } else {
    Order.findAll({where: {
      userId: req.session.passport.user,
      status: 'closed'
    }})
    .then((priorOrders) => {
      res.send(priorOrders)
    })
    .catch(next);
  }

})

module.exports = router;
