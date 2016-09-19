'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

router.use('/carts', require('./carts'));
router.use('/members', require('./members'));
router.use('/categories', require('./categories'));
router.use('/powers', require('./powers'));
router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
