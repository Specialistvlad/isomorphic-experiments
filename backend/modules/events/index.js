const base = require('../base/');
const dal = require('./dal');
const validation = require('./validation');
const service = base(dal, validation);

service.install = function (opts) {
	const data = opts.body;
	data.event = 'install';
	return validation.install(data)
		.then(dal.create.bind(null, data));
}

service.uninstall = function (opts) {
	const data = opts.body;
	data.event = 'uninstall';
	return validation.uninstall(data)
		.then(dal.create.bind(null, data))
}

service.getStats = dal.getStats;

module.exports = service;
