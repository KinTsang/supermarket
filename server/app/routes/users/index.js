'use strict'

const express = require('express');
const router = express.Router();
const Model = require('../../../db');
const User = Model.User;

//get all users

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
module.exports = router;


// router.put('/editUser', function (req, res, next) {
//    if (!req.session.passport.user) {
//     req.session.shipping = req.body;
//     return;
//    }
//    else {

//    }
// });
