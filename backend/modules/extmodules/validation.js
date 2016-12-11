const validator = require('../../core/validator');
const schema = {
	title: ['required'],
	code: ['required'],
};

const update = validator.bind(null,
	Object.assign({}, schema, {
		_id: ['required', 'mongoId'],
	})
);

const getExploites = validator.bind(null, {
	extension_id: ['required', 'realExtension', 'extensionExploited'],
	install_id: ['required', 'realInstallId'],
});

module.exports = {
	create: validator.bind(null, schema),
	update,
	getExploites,
};
