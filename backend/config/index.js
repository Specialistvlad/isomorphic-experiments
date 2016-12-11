module.exports = require('cnfg')(__dirname);
module.exports.env = process.env.NODE_ENV || 'development';
module.exports.dev = module.exports.env == 'development';
