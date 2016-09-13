'use strict'

const express = require('express');
const router = express.Router();
const Model = require('../../../db');
const Category = Model.Category;
const Power = Model.Power;

//Get all categories
router.get('/', function(req, res, next){
	Category.findAll()
		.then(function(foundCategories){
			res.send(foundCategories);
		})
		.catch(next);
});

//Get all powers within a category
router.get('/:categoryId', function(req, res, next){
	let searchReqs = {}
	if (req.params.categoryId !== 'all'){
		searchReqs.where = {categoryId: req.params.categoryId};
	}
	Power.findAll(searchReqs)
		.then(function(foundPowers){
			res.send(foundPowers);
		})
		.catch(next)
});

//Create a new category
router.post('/', function(req, res, next){
	
});

//Modify a category
router.put('/:categoryName', function(req, res, next){

});

//Delete a category
router.delete('/:categoryName', function(req, res, next){

});
