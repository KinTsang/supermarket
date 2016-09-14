'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var Models = require('../../../db');
var Power = Models.Power;

//find a specific power by Id
router.get('/:powerId', function(req, res){
    console.log('The route for GET /powers/:powerID was hit');

    Power.findById(req.params.powerId)
    .then(function(foundPower){
        console.log('This is the power Found: ', foundPower)
        res.status(200).send(foundPower);
    })
})

//creating a new product api/powers/create
router.post('/create', function(req, res){
        console.log('The route for POST /powers/:powerID was hit with : ', req.body);

        Power.create(req.body)
        .then(function(createdPower){
            console.log('This is the power created: ', createdPower)
            res.status(200).send(createdPower);
        });
})

//updating an existing product api/powers/edit/:powerId
router.put('/:powerId', function(req, res){
        console.log('The route for PUT /powers/:powerID was hit with : ', req.body);

        Power.findById(req.params.powerId)
        .then(function(powerFound){
            return powerFound.update(req.body)
            .then(function(updatedPower){
                res.status(200).send(updatedPower)
            })
        })

});

//route to delete a product
//NOTE: DO NOT USE BECAUSE ADMIN CAN SET QUANTITY TO 0 -> making product not add-able to cart
router.delete('/:powerId', function(req, res){

    Power.findById(req.params.powerId)
    .then(function(foundPower){
        return foundPower.destroy()
        .then(function(destroyedPower){
            console.log("The ")
            res.status(200).send(destroyedPower)
        })
    })
})
