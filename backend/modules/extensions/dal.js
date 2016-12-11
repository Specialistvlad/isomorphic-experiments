const Model = require('./model');
const base = require('../base/dal');

const dal = base(Model);
dal.findByExtensionId = function (extension_id) {
	return Model.find().sort( { _id: -1 } );
}

module.exports = dal;
