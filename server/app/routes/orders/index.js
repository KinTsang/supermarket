'use strict';
const express = require('express')
const router = express.Router(); // eslint-disable-line new-cap
const Models = require('../../../db');

const PowerOrder = Models.PowerOrder;
const Order = Models.Order;

// ROUTES BEGINNING '/api/orders'

// router.get('/', function(req, res, next){
//   Order.findAll({where: {
//     userId: req.session.passport.user,
//     status: 'closed'
//   }})
//   .then(function(allOrders){
//     var promiseArr = [];

//     allOrders.forEach(function(ele){
//       var eachOrder = PowerOrder.findAll({where: {
//         orderId: ele.dataValues.id
//       }}).then(function(allOrdersWithItem){
//         return allOrdersWithItem;
//       })

//       promiseArr.push(eachOrder);
//     })

//     return Promise.all(promiseArr)

//   })
//   .then((allPriorOrders) => {
//     console.log(allPriorOrders)
//     res.send(allPriorOrders)
//   })
//   .catch(next)
// });

router.get('/', function(req, res, next){

  if (req.query.OrderId) {
    PowerOrder.findAll({where: {
      orderId: req.query.OrderId
    }})
    .then((orderDetail) => {
      res.send(orderDetail)})
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
