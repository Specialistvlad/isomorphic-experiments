import { compose, createStore, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
// import promiseMiddleware from 'redux-promise-middleware';
// import logger from 'redux-logger';

import reducer from './reducer';
import config from './config';

const initialState = window.__PRELOADED_STATE__ || {};

const composeEnhancers = typeof window === 'object'
	&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
	: compose;

const enhancer = composeEnhancers(
	applyMiddleware(
		thunk,
		promiseMiddleware,
		// logger()
	),
);

export default createStore(reducer, initialState, enhancer);
