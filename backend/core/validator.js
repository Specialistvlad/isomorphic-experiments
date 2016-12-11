const _ = require('lodash');
const Promise = require('bluebird');
const objectPath = require('object-path');
const errors = require('./errors');
const rules = require('./validator-rules');

const resolveValidator = function(alias) {
	return rules[alias];
};

const validate = function (schema, data, user_id) {
	let promises = [];
	_.forEach(schema, function(validators, field) {
		var fieldValue = objectPath.get(data, field);
		if (_.isEmpty(fieldValue) && validators.indexOf('required') === -1) {
			return;
		}

		var fieldPromises = validators.map(function(alias) {
			var validator = resolveValidator(alias);
			if (!validator) {
				throw new Error('Can\'t find validator ' + alias);
			}
			var result = validator.call(data, fieldValue, field, user_id);
			return Promise.resolve(result).then(function(error) {
				if (error) {
					var err = {};
					err[field] = error;
					return err;
				}
			});
		});

		promises = promises.concat(fieldPromises);
	});

	return Promise.all(promises).then(function(result) {
		result = result.filter(Boolean);

		if (result.length) {
			return Promise.reject(new errors.ValidationError(_.assign.apply(undefined, result)));
		}

		return data;
	});
};

module.exports = validate;
