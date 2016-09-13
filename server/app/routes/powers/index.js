'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var Models = require('../../../db');
var Power = Models.Power;

//find a specific power by Id
router.get('/:powerId', function(req, res){
    console.log('The route for /powers/:powerID was hit');

    Power.findById(req.params.powerId)
    .then(function(foundPower){
        console.log('This is the power Found: ', foundPower)
        res.status(200).send(foundPower);
    })
})

