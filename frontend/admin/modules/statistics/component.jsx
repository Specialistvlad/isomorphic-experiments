import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as predicates from '../../shared/component-state-predicates.js';
import * as containerShortcuts from '../../components/container-shortcuts';

import { actions, selectors } from './';
import ListItem from './list-item';
import ListHeader from './list-header';

function MyComponent(props) {
	switch (true) {
		case predicates.uninitialized(props): return fetch(props)
		case predicates.gotEntities(props): return render(props)
		case predicates.isPending(props): return containerShortcuts.loading();
		case predicates.gotEmpty(props): return containerShortcuts.empty();
		case predicates.gotError(props): return containerShortcuts.error();
		default: throw new Error('Undefined state');
	}

	function fetch (props) {
		props.fetch();
		return null;
	}

	function render (props) {
		return (
			<div className="component-container-details component-container-table component-statistics">
				<table className="highlight">
					{ListHeader()}
					<tbody>
						{props.result.map(
							(item, index) => ListItem({ ...item, index })
						)}
					</tbody>
				</table>
			</div>
		)
	}
};

export default connect(state => ({
		status: selectors.getPageStatus(state),
		result: selectors.getResult(state),
	}),
	dispatch => bindActionCreators(actions, dispatch)
)(MyComponent);
