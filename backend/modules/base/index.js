const _ = require('lodash');

module.exports = function base (dal, validation) {
	return {
		find: function find (opts) {
			return dal.find();
		},

		findOne: function findOne (opts) {
			return dal.findOne({ _id: opts.params.id });
		},

		create: function create (opts) {
			return validation.create(opts.body)
			.then(dal.create.bind(this, opts.body));
		},

		update: function update (opts) {
			let mergedData = Object.assign(opts.params, opts.body);
			return validation.update(mergedData)
			.then(dal.update.bind(this, opts.params.id, opts.body));
		},
	};
};
