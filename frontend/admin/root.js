import './styles/fonts.scss';
import './styles/index.scss';
import './styles/materialize.scss';
// import 'materialize-css/bin/materialize.js';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';
import routes from './routes';

const history = syncHistoryWithStore(browserHistory, store);

class Root extends Component {
	render () {
		return (
			<Provider store={store}>
				<Router history={history} routes={routes}>
				</Router>
			</Provider>
		);
	}
}

export default Root;
