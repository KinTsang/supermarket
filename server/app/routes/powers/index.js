'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var _ = require('lodash');
var Models = require('../../../db');
var Power = Models.Power;
var PowerCategory = Models.PowerCategory;

//router.param -- KHJC

router.get('/all', function(req, res, next){
    console.log('The route for GET /powers/all was hit'); //don't want logs like this in master -- KHJC

    Power.findAll({}) //consider eager loading (i.e. 'include'); also here you could have req.query so you can get only specific powers based on categories
    .then(function(allPower){
        res.status(200).send(allPower); //200 is default -- KHJC
    })
    .catch(next)
})

//function for throwing error for modularity -- kHJC

//find a specific power by Id
router.get('/:powerId', function(req, res, next){ //consider looking into router.param -- KHJC
    console.log('The route for GET /powers/:powerID was hit');

    Power.findById(req.params.powerId)
    .then(function(foundPower){ //what if you don't get a power with this find (e.g. valid id, but not associated with a power) -- KHJC
        //let error = new Error('no power found');
        //error.status()
        //throw error -- KHJC
        console.log('This is the power Found: ', foundPower)
        res.status(200).send(foundPower);
    })
    .catch(next)
})


//creating a new product api/powers/create
router.post('/create', function(req, res, next){ //authentication; who is going to add powers? Admin? check that -- KHJC
        console.log('The route for POST /powers/:powerID was hit with : ', req.body);

        Power.create(req.body) //do you want all of these properties, or potentially you just want some/check them; this will be very important in the user routes -- KHJC
        .then(function(createdPower){
            return PowerCategory.create({ //use Sequelize methods Power.addCategory(ies) -- KHJC
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
        .then(function(powerFound){ //same as before, what if no powerFound -- kHJC
            return powerFound.update(req.body) //same as before, what if bad user input -- KHJC
            .then(function(updatedPower){
                res.status(200).send(updatedPower)
            })
        })
        .catch(next);

});

//route to delete a product
//NOTE: DO NOT USE BECAUSE ADMIN CAN SET QUANTITY TO 0 -> making product not add-able to cart
router.delete('/:powerId', function(req, res, next){ //are you still using this or just updating the power with a new status (active/inactive) -- KHJC

    Power.findById(req.params.powerId)
    .then(function(foundPower){
        return foundPower.destroy()
        .then(function(destroyedPower){
            res.status(200).send(destroyedPower)
        })
    })
    .catch(next);
})
