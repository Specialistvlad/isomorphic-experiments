import path from 'path';
import Express from 'express';
import requestLog from 'express-request-log';
import proxy from 'express-http-proxy';

import { renderController } from './controllers.js'
import config from '../config';

const app = Express();
app.use(requestLog(console, {
  headers: false,
  request: true,
  response: false
}));


// Forward proxy for request to the admin-api
app.use('/api', proxy(config.api_url));

// Prevent loading index.html from static folder with SPA, instead render app
app.get(['/', 'index.html', 'index.htm'], renderController);
app.use(Express.static(path.join(__dirname, '../build')));
app.use(Express.static(path.join(__dirname, '../static')));

// Give a chance to find a route using frontend react-router
app.get('*', renderController);

// Standart express.js way to handle errors
app.use(function handleErrors(err, req, res, next) {
  res.status(500).send(err.stack || err);
  throw err;
});

// Handling warnings and unhandled rejections
process.on('warning', console.warn);
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

app.listen(config.lister_port);
console.log(`Listening at ${config.lister_port}`);
