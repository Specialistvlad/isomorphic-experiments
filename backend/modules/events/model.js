let mongoose = require('../../core/mongoose');

let Schema = new mongoose.Schema({
	event: String,
	reason: String,
	install_id: String,
	extension_id: String,
}, {
	timestamps: true,
});

module.exports = mongoose.model('Events', Schema);
