const app = require('express')();
const bodyParser = require('body-parser');
const requestLog = require('express-request-log');

const config = require('../../config');
const routes = require('./routes');

app.use(requestLog(console, {
	headers: true,
	request: true,
	response: true
}));
app.use(bodyParser.json());
routes(app);
app.listen(config.apps.main_api.port, () =>
	console.log(`Listening on port ${config.apps.main_api.port}`));
