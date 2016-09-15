'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

router.use('/carts', require('./carts'));
router.use('/members', require('./members'));
router.use('/categories', require('./categories'));

//route to query powers
router.use('/powers', require('./powers'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
