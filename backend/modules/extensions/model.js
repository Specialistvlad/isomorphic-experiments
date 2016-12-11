let mongoose = require('../../core/mongoose');

let extensionSchema = new mongoose.Schema({
	title: String,
	status: String,
	domain: String,
	extension_id: String,
}, {
	timestamps: true,
});

module.exports = mongoose.model('Extension', extensionSchema);
