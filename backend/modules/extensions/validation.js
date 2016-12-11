const validator = require('../../core/validator');
const schema = {
	title: ['required'],
	// status: ['required'],
	domain: ['required'],
	extension_id: [],
};

const updateSchema = Object.assign({}, schema, {
	_id: ['required', 'mongoId'],
});

module.exports = {
	create: validator.bind(null, schema),
	update: validator.bind(null, updateSchema),
};
