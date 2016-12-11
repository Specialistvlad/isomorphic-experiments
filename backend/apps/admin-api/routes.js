const _ = require('lodash');
const errors = require('../../core/errors');
const moduleExtensions = require('../../modules/extensions');
const moduleExtmodules = require('../../modules/extmodules');
const moduleEvents = require('../../modules/events');

module.exports = (app) => {
	app.use((req, res, next) => setTimeout(() => next(), 1500));
	app.get('/extensions', wrapper.bind(moduleExtensions.find));
	app.post('/extensions', wrapper.bind(moduleExtensions.create));
	app.get('/extensions/:id', wrapper.bind(moduleExtensions.findOne));
	app.put('/extensions/:id', wrapper.bind(moduleExtensions.update));

	app.get('/extmodules', wrapper.bind(moduleExtmodules.find));
	app.post('/extmodules', wrapper.bind(moduleExtmodules.create));
	app.get('/extmodules/:id', wrapper.bind(moduleExtmodules.findOne));
	app.put('/extmodules/:id', wrapper.bind(moduleExtmodules.update));

	app.get('/stats', wrapper.bind(moduleEvents.getStats));

	app.use((req, res) => res.sendStatus(404));
	app.use(handleErrors);
}

function wrapper (req, res, next) {
	this(_.pick(req, ['params', 'body']))
	.then(data => data ? res.json(data) : res.sendStatus(204))
	.catch(e => next(e));
}

function handleErrors(err, req, res, next) {
	switch (err.constructor) {
		case errors.NotFound:
			res.sendStatus(404);
			break;
		case errors.ValidationError:
			res.status(400).send(err);
			break;
		default:
			res.status(500).send(err.stack || err);
			console.error(err.stack || err);
	}
}
