'use strict'
const express = require('express');
const router = express.Router();
const Models = require('../../../db');
const Category = Models.Category;

// ROUTES BEGINNING '/api/categories'

//Get all categories
router.get('/', function(req, res, next) {
    Category.findAll()
        .then(foundCategories => res.send(foundCategories))
        .catch(next);
});

//Get category by id
router.get('/:categoryId', function(req, res, next) {
    Category.findById(req.params.categoryId)
        .then(foundCategory => res.send(foundCategory))
        .catch(next);
});

///////////////////////////////
//////ADMIN ROUTES BELOW///////
///////////////////////////////

//Create a new category
router.post('/', function(req, res, next) {
    Category.create(req.body)
        .then(createdCategory => res.send(createdCategory))
        .catch(next);
});

//Modify a category
router.put('/:categoryId', function(req, res, next) {
    Category.findById(req.params.categoryId)
        .then(foundCategory => foundCategory.update(req.body))
        .then(updatedCategory => res.send(updatedCategory))
        .catch(next);
});

// // Delete a category
// router.delete('/:categoryId', function(req, res, next) {
//     Category.findById(req.params.categoryId)
//         .then(foundCategory => foundCategory.destroy())
//         .then(res.sendStatus(204))
//         .catch(next);
// });

module.exports = router;
