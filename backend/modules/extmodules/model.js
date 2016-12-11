let mongoose = require('../../core/mongoose');

let Schema = new mongoose.Schema({
	title: String,
	enabled: Boolean,
	code: String,
}, {
	timestamps: true,
});

module.exports = mongoose.model('Extmodules', Schema);
