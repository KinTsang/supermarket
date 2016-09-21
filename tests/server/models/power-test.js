//1. require models
var db = require('../../../server/db').db;
var Power = db.model('power'); //why lowercase and not upper case
var chai = require('chai');
var mocha = require('mocha');
var expect = chai.expect;


describe('Power Model', function (done) {
//putting done as a parameter for beforeEach tells mocha to run asynch then go to the next test
   beforeEach(function () {

     Power.sync({force: true}) //DROP TABLE, returns a promise, async

   });

   describe('Validations', function () {

    it('errors without name', function () {
        var power = Power.build();
        return power
            .validate()
            .then(function (err) {
                expect(err).to.exist;
            })
    });

   });
});

//on terminal: NODE_ENV="testing"
// mocha test file.js
