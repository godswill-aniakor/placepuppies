const router = require('express').Router();

const placeholder = require('./placeholder');

router.use('/', placeholder);

module.exports = router;