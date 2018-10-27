const router = require('express').Router();
const picsum = require('./../service/picsum');
const config = require('./../config');

picsum.initialize((err, data) => {
    if (err) {
        return router.get('/*', (req, res) => {
            res.json({'errors': { 
                message: err.message, error: (!config.is_production) ? err : {}
            }});
        });
    }
    router.get('/', (req, res) => picsum.serveImage(req, res));
    router.get('/:width/:height', (req, res) => picsum.serveImage(req, res));
});

module.exports = router;