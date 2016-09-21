'use strict'

const express = require('express');
const router = express.Router();
const Model = require('../../../db');
const User = Model.User;
const Order = Model.Order;
const Power = Model.Power;

//get all users



//sign up: create new user

//sign up: create new user
router.post('/', function (req, res, next) {
  User.create(req.body)
    .then(foundUser => res.status(201).send(foundUser))
    .catch(next);
});


//edit user
router.put('/', function (req, res, next) {
  if (!req.params.userId) {
    req.session.address = req.body;
    console.log(req.session);
    res.send(req.body);
   } else {
     User.findById(req.session.passport.user)
    .then(foundUser => foundUser.update(req.body))
    .then(updatedUser => res.send(updatedUser))
    .catch(next);
   }
})

//router.put
router.get('/orders', function(req, res, next){
  console.log('in get orders');
  if (req.query.OrderId) {
    console.log('iaminif')
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
    console.log('i am in else');
    console.log(req.session.passport.user);
    Order.findAll({where: {
      userId: req.session.passport.user,
      status: 'closed'
    }})
    .then((priorOrders) => {
      console.log('prior', priorOrders);
      res.send(priorOrders)
    })
    .catch(next);
  }

});

router.get('/', function (req, res, next){
  User.findAll
  .then(allUsers => res.send(allUsers))
  .catch(next);
})

//get specific user
router.get('/:userId', function (req, res, next) {
  User.findOne({
    where: {id: req.params.userId}
  })
  .then(foundUser => res.send(foundUser))
  .catch(next);
});

module.exports = router;


// router.put('/editUser', function (req, res, next) {
//    if (!req.session.passport.user) {
//     req.session.shipping = req.body;
//     return;
//    }
//    else {

//    }
// });
