import { createStore, applyMiddleware, } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import ReduxWaitMe from './redux-wait-me';
// import promiseMiddleware from 'redux-promise-middleware';

import reducers from '../reducer';
import config from '../config';

const middlewares = [
	thunk,
	promiseMiddleware,
];

if (config.redux_logger) {
	middlewares.push(logger({
		colors: {},
		diff: true,
		duration: true,
	}));
}

export default function configureStore({ initialState, deferred }) {
	const reduxWaitMe = ReduxWaitMe(deferred, 2000);
	const middleware = applyMiddleware(reduxWaitMe, ...middlewares);
  return createStore(reducers, initialState, middleware);
}
