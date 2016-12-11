const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('../config');

mongoose.Promise = Promise; // for mongoose
mongoose.connect(config.db.mongo, {
	replset: { socketOptions: { keepAlive: true } },
	promiseLibrary: Promise // for mongodb driver
});


mongoose.connection.on('error', function (error) {
	log.error('db connection error', { stack: error.stack });
	process.exit(11);
});

module.exports = mongoose;
