'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/users', require('./users'));
router.use('/:userId/notebooks', require('./notebooks'));
router.use('/notebooks/public', require('./notebooks/public'));
router.use('/:userId/notes', require('./notes'));
router.use('/notes/public', require('./notes/public'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
