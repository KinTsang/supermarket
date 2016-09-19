'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var Models = require('../../../db');
var Power = Models.Power;
var PowerCategory = Models.PowerCategory;
var Review = Models.Review;

router.post('/addReviews/:powerId', function(req, res, next){
    console.log("The addReview route is hit: ", req.body)
    Review.create({
        description: req.body.description,
        rating: req.body.rating,
        powerId: req.params.powerId,
        userId: req.session.userId
    })
    .then((createdReview) => res.send(createdReview))
    .catch(next);
})

router.get('/reviews/:powerId', function(req, res, next){
    console.log("The review query route was hit with the powerId: ", req.params.powerId)
    Review.findAll({
        where: {
            powerId: req.params.powerId
        }
    })
    .then((reviewInfo) => res.send(reviewInfo))
    .catch(next)
})

router.get('/all', function(req, res, next){
    console.log('The route for GET /powers/all was hit');

    Power.findAll({})
    .then(function(allPower){
        res.status(200).send(allPower);
    })
    .catch(next)
})

//find a specific power by Id
router.get('/:powerId', function(req, res, next){
    console.log('The route for GET /powers/:powerID was hit');

    Power.findById(req.params.powerId)
    .then(function(foundPower){
        console.log('This is the power Found: ', foundPower)
        res.status(200).send(foundPower);
    })
    .catch(next)
})


//creating a new product api/powers/create
router.post('/create', function(req, res, next){
        console.log('The route for POST /powers/:powerID was hit with : ', req.body);

        Power.create(req.body)
        .then(function(createdPower){
            return PowerCategory.create({
                powerId: createdPower.id,
                categoryId: req.body.categoryId
            })
        })
        .then(function(createdPowerWithAssociation){
            res.status(200).send(createdPowerWithAssociation)
        })
        .catch(next)

})

//updating an existing product api/powers/edit/:powerId
router.put('/:powerId', function(req, res, next){
        console.log('The route for PUT /powers/:powerID was hit with : ', req.body);

        Power.findById(req.params.powerId)
        .then(function(powerFound){
            return powerFound.update(req.body)
            .then(function(updatedPower){
                res.status(200).send(updatedPower)
            })
        })
        .catch(next);

});

//route to delete a product
//NOTE: DO NOT USE BECAUSE ADMIN CAN SET QUANTITY TO 0 -> making product not add-able to cart
router.delete('/:powerId', function(req, res, next){

    Power.findById(req.params.powerId)
    .then(function(foundPower){
        return foundPower.destroy()
        .then(function(destroyedPower){
            res.status(200).send(destroyedPower)
        })
    })
    .catch(next);
})
