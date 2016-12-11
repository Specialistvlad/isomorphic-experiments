const Model = require('./model');
const base = require('../base/dal');

const dal = base(Model);
dal.getExploites = function (extensionId) {
	return Model.find({}, { _id: 1, code: 1 });
}

module.exports = dal;
