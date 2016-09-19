'use strict';
const express = require('express')
const router = express.Router(); // eslint-disable-line new-cap
const Models = require('../../../db');
const Review = Models.Review;
const User = Models.User;

// ROUTES BEGINNING '/api/reviews'

//Get all reviews: '/'
//Get all reviews of a specified power: '/?powerId='
router.get('/', function(req, res, next) {
    Review.findAll({
            where: req.query,
            include: { model: User }
        })
        .then(foundReviews => res.send(foundReviews))
        .catch(next);
})

//Get a specific review by Id
router.get('/:reviewId', function(req, res, next) {
    Review.findById(req.params.reviewId)
        .then(foundReview => res.status(200).send(foundReview))
        .catch(next);
})

///////////////////////////////
//////ADMIN ROUTES BELOW///////
///////////////////////////////

//Create a new review
router.post('/create/:powerId', function(req, res, next) {
    Review.create({
        description: req.body.description,
        rating: req.body.rating,
        powerId: req.params.powerId,
        userId: req.session.userId
    })
    .then((createdReview) => res.send(createdReview))
    .catch(next);
})

//Modify a power
router.put('/:reviewId', function(req, res, next) {
    Review.findById(req.params.reviewId)
        .then(foundReview => foundReview.update(req.body))
        .then(updatedReview => res.status(200).send(updatedReview))
        .catch(next);
});

module.exports = router;
