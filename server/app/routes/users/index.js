'use strict'

const express = require('express');
const router = express.Router();
const Model = require('../../../db');
const User = Model.User;

//sign up: create new user

router.post('/', function (req, res, next) {
  User.create(req.body)
    .then(foundUser => res.status(201).send(foundUser))
    .catch(next);
});

// router.post('/', function (req, res, next) {
//   User.findOrCreate({
//     where: {
//       email: req.body.email,
//       password: req.body.password
//     }
//   })
//     .spread(function (user, boolean) {

//     })
//     .then(foundUser => res.status(201).send(foundUser))
//     .catch(next);
// });
module.exports = router;
