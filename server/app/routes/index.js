'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/users', require('./users'));
router.use('/notes', require('./notes/public.notes.js'));
router.use('/public', require('./public'));
router.use('/notes', require('./notes'));



// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
