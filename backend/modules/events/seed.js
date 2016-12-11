const ExtensionModel = require('./model');
const c = require('casual');
const _ = require('lodash');

module.exports = function (n = 1) {
	let data = [];
	for (i=0; i<n; i++) {
		let item = new ExtensionModel({
				title: c.title,
				domain: c.domain,
				status: c.random_element(['enabled', 'paused', 'disabled']),
				stats: {
					conversion: c.integer(0, 500),
					traffic: c.integer(0, 500),
					online: c.integer(0, 500),
					installs: c.integer(0, 500),
				}
		});
		data.push(item.save());
	}
	return Promise.all(data);
}
