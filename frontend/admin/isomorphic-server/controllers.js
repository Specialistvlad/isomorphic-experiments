import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import Deferred from 'deferred';

import config from '../config';
import routes from '../routes';
import configureStore from './store';

const tempalePath = path.join(__dirname, '../static/index.html');
const htmlTemplate = fs.readFileSync(tempalePath).toString();

export function renderController(req, res, next) {
	match({
    routes: routes,
    location: req.url
  }, function renderMatchRoute(err, redirect, props) {
    if (err) {
      next(err);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      render(props)
				.then(html => res.send(html))
	      .catch(err => next(err));
    } else {
      res.send(404);
      // res.redirect('/');
    }
  });
}

function render(props) {
  var deferred = Deferred();
  const store = configureStore({ deferred });
	// Fake rendering, just trigger included actions
	renderComponent(store, props);
	// Render one more time when dispatching was done
	return deferred.promise
	  .then(renderComponent.bind(null, store, props))
	  .then(html => composeHtml(html, store.getState()));
}

function renderComponent(store, props) {
  return renderToString(
    <Provider store={store}>
      <RouterContext {...props}/>
    </Provider>
  );
};

function composeHtml(html, preloadedState = {}) {
  const root = '<div id="root"></div>';
  const code = '<script src="/bundle.js"></script>';
  preloadedState = JSON.stringify(preloadedState);

  return htmlTemplate
  .replace(root, `<div id="root">${html}</div>`)
  .replace(code, `
    <script>window.__PRELOADED_STATE__ = ${preloadedState}</script>
		${config.spa ? '<script src="/bundle.js"></script>' : ''}
    `);
}
