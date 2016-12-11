const validator = require('../../core/validator');
const schema = {
	extension_id: ['required', 'realExtension'],
	install_id: ['required', 'realInstallId'],
};

const installSchema = Object.assign({}, schema, {
	reason: ['required', 'installReason'],
	install_id: ['required', 'installId'],
});

module.exports = {
	install: validator.bind(null, installSchema),
	uninstall: validator.bind(null, schema),
	track: validator.bind(null, schema),
};
