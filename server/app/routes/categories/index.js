'use strict'

const express = require('express');
const router = express.Router();
const Model = require('../../../db');
const Category = Model.Category;
const Power = Model.Power;

//Get all categories
router.get('/', function(req, res, next){
	Category.findAll()
		.then(foundCategories => res.send(foundCategories))
		.catch(next);
});

//Get all powers
router.get('/all/powers', function(req, res, next){
    Power.findAll()
      .then(foundPowers => res.send(foundPowers))
      .catch(next);
});

//Get category by id
router.get('/:categoryId', function(req, res, next){
  Category.findById(req.params.categoryId)
    .then(foundCategory => res.send(foundCategory))
    .catch(next);
});


//Get all powers within a category
router.get('/:categoryId/powers', function(req, res, next){
  Category.findById(req.params.categoryId)
    .then(foundCategory => {
      foundCategory.getPowers()
        .then(foundPowers => res.send(foundPowers))
    })
    .catch(next);
});


///////////////////////////////
//////ADMIN ROUTES BELOW///////
///////////////////////////////


//Create a new category
router.post('/', function(req, res, next){
  Category.create(req.body)
  .then(createdCategory => res.send(createdCategory))
  .catch(next);
});

//Modify a category
router.put('/:categoryId', function(req, res, next){
  Category.findOne({
    where: {
      categoryId: req.params.categoryId
    }
  })
  .then(foundCategory => foundCategory.update(req.body)
        .then(updatedCategory => res.send(updatedCategory)))
  .catch(next);
});

//Delete a category

//TLEE QUESTION: how to use es6 with an empty parameter like the last .then below
router.delete('/:categoryName', function(req, res, next){
  Category.findOne({
    where: {
      categoryId: req.params.categoryId
    }
  })
  .then(foundBook => foundBook.destroy()
        .then(function(){
          res.sendStatus(204);
        }))
  .catch(next);
});

module.exports = router;
