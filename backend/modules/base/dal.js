const _ = require('lodash');
const errors = require('../../core/errors');
const Promise = require('bluebird');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = function (Model) {
	return {
		find: function find () {
			return Model.find().sort( { _id: -1 } );
		},

		findOne: function findOne (query) {
			if (query._id) {
				if (ObjectId.isValid(query._id)) {
					query._id = ObjectId(query._id);
				} else {
					delete query._id;
				}
			}

			return Model.findOne(query)
			.then(res => {
				if (_.isNull(res)) {
					return Promise.reject(new errors.NotFound());
				} else {
					return res
				}
			});
		},

		create: function create (body) {
			body = _.omit(body, ['_id']);

			let item = new Model(body);
			return item.save();
		},

		update: function update (_id, body) {
			body = _.omit(body, ['_id']);

			return Model
				.findOneAndUpdate({ _id: ObjectId(_id) }, body)
				.then(() => Model.findOne({ _id: ObjectId(_id) }));
		},
	};
};
