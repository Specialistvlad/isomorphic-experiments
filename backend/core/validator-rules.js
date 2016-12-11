const v = require('validator');
const _ = require('lodash');
const ObjectId = require('mongoose').Types.ObjectId;

const extensions = require('../modules/extensions/dal');
const events = require('../modules/events/dal');

function t (opts, phrase) {
	return phrase;
}

v.isURL = function (url) {
	return url.match(/^https?:\/\/\S+$/);
};

const required = function (value, key, user) {
	if (_.isEmpty(value) && !_.isNumber(value)) {
		return t(user, 'Required field');
	}
};

const arrayValidator = function (validator) {
	return function (value, key, user) {
		if (!_.isArray(value)) {
			return 'Should be an array';
		}

		value = _.find(value, validator);
		if (value) {
			return validator(value, key, user);
		}
	};
};

const email = function (value, key, user) {
	if (!v.isEmail(value)) {
		return t(user, 'Wrong email');
	}
};

const object = function (value) {
	if (!_.isObject(value)) {
		return 'Should be object';
	}
};

const url = function (value, key, user) {
	if (!v.isURL(value)) {
		return t(user, 'Should be url');
	}
};

const text = function (value, key, user) {
	if (!_.isString(value)) {
		return t(user, 'Should be string');
	}
};

const domain = function(domain, key, user) {
	if (!v.isFQDN(domain)) {
		return t(user, 'Wrong domain');
	}
};

const mongoId = function (id, key, user) {
	if (!ObjectId.isValid(id)) {
		return t(user, 'Wrong id');
	}
};

const realExtension = function (value, key, user) {
	return extensions.findOne({ extension_id: value })
	.then((res) => res ? null : t(user, `${key} ${value} does not exist.`));
};

const installId = function (value, key, user) {
	return /^[0-9]{13,15}$/.test(value) ? null : t(user, `Wrong ${key} ${value}`);
};

const realInstallId = function (value, key, user) {
	return events.findOne({ install_id: value })
	.then((res) => res ? null : t(user, `Wrong ${key} ${value}`));
};

const installReason = function (value, key, user) {
	if (value !== 'install') {
		return t(user, `Should be "install".`);
	}
};

const extensionExploited = function (value, key, user) {
	return extensions.findOne({
		extension_id: value,
		// status: 'enabled',
		//TODO enable status validation
	})
	.then((res) => res ? null : t(user, `${key} ${value} does not exploited.`));
};

module.exports = {
	required,
	text,
	email,
	url,
	domain,
	mongoId,
	realExtension,
	installId,
	realInstallId,
	installReason,
	extensionExploited,
};
