var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db').db;

var Category = db.model('category');

describe('Category model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    let createCategory = function(name) {
        return Category.create({ name: name });
    };

    it('can create new category', (done) => {
        createCategory('Test Category 1').then(() => `return`)
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
        });
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

    xit('can update a category', (done) => {
        createCategory('Test Category 1').then(() => `return`)
        .then(() => {
            return Category.findOne({ where: { name: 'Test Category 1'} });
        })
        .then((c) => {
            return c.update
        });
    });

});
