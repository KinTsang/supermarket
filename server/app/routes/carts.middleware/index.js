'use strict';

const express = require('express');
const router = express.Router();
const Model = require('../../../db');
const Order = Model.Order;

router.get('/', function(req, res, next){

  let userId = req.session.userId;

    //check if there is a userId, if not, next()
  if (!userId) {
    next();
  }


    Order.findOne({where: {
      userId: req.session.userId
    }})
    .then(function(foundEntry){
      console.log('found entry : ', foundEntry);
      next();
    })

  //if there is a userId, check db to see if there is already an order number in the databse

    //if there is already an order number..then i will add the info current in req.session.cart in the databse.

    //if there is not an order number with the user id, then i add the req.session.cart in the databse.

    //if not then next();
})
