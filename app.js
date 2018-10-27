const express = require('express');
const errorhandler = require('errorhandler');
const config = require('./config');
const compress = require('compression');
const controller = require('./controller');

// create application object
const app = express();

if (!config.is_production) {
    app.use(errorhandler());
}

// user compression
app.use(compress());

app.use(controller);

// 404 handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle server stack traces
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message, error: (!config.is_production) ? err : {}
        }
    });
});

// start application
const server = app.listen(process.env.PORT || config.port, () => {
    console.log(`Placepuppies REST server listening at http://localhost:${server.address().port}`)
});

// for testing
module.exports = app;
