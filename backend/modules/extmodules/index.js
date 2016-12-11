const base = require('../base/');
const dal = require('./dal');
const validation = require('./validation');

const mod = base(dal, validation);

mod.getExploites = function (data) {
	return validation.getExploites(data)
		.then(() => dal.getExploites(data.extension_id));
}

module.exports = mod;
