const router = require('express').Router();

const placeholder = require('./placeholder');

router.use('/placepuppies', placeholder);

module.exports = router;