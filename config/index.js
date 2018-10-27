
module.exports = (() => {
    const conf = require('./../conf.json');
    const env = process.env.NODE_ENV || 'production';
    const config = conf[env];

    // sets production status
    config.is_production = env === "production";

    return config;
})();
