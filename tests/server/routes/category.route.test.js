const chai = require('chai');
const Promise = require('bluebird');
const expect = chai.expect;
const Category = db.model('category');
const supertest = require('supertest-as-promised');
var app = require('../server/app');
var agent = supertest.agent(app);

