var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db').db;

var Category = db.model('category');

//I want to see more tests!!

describe('Category model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    let createCategory = function(name) {
        return Category.create({ name: name });
    };

    //we are testing sequelize functions not your functions here. You could test your model if you have specific validation, try to create it without those validations (and the following tests) -- KHJC
    it('can create new category', (done) => { //could return promise instead of calling done (remember from WIkistack testing) -- KHJC
        createCategory('Test Category 1').then(() => `return`) //YAYYYYY fat arrow -- KHJC
        createCategory('Test Category 2').then(() => `return`)
        .then(() => {
            return Category.findOne({ where: { name: 'Test Category 1' } });
        })
        .then((c) => {
            expect(c).to.be.ok;
        })
        .then(() => {
            return Category.findOne({ where: { name: 'Test Category 2' } });
        })
        .then((c) => {
            expect(c).to.be.ok;
            done();
        }); //what about dem errors? -- KHJC
    });

    it('can retrive multiple categories', (done) => {
        createCategory('Test Category 1').then(() => `return`)
        createCategory('Test Category 2').then(() => `return`)
        .then(() => {
            return Category.findAll({ });
        })
        .then((cs) => {
            expect(cs.length).to.be.equal(2);
            done();
        });
    });

    it('can update a category', (done) => {
        createCategory('Test Category 1').then(() => `return`)
        .then(() => {
            return Category.findOne({ where: { name: 'Test Category 1'} });
        })
        .then((c) => {
            return c.update //no expectation after this and done isn't called -- KHJC
        });
    });

});
