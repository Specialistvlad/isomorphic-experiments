const base = require('../base/');
const dal = require('./dal');
const validation = require('./validation');

const service = base(dal, validation);
service.findByExtensionId = dal.findByExtensionId;

module.exports = service;
