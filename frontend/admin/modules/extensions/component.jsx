import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as predicates from '../../shared/component-state-predicates.js';
import * as containerShortcuts from '../../components/container-shortcuts';
import { FloatingButton } from '../../components/floating-button';

import { actions, selectors } from './';
import ListItem from './list-item';

class MyComponent extends Component {
	constructor(props) {
		super(props);
		if (predicates.uninitialized(props)) {
			props.fetch();
		}
	}

	render() {
		const props = this.props;
		switch (true) {
			case predicates.uninitialized(props): return null
			case predicates.gotEntities(props):
			case predicates.gotEmpty(props): return render(props);
			case predicates.isPending(props): return containerShortcuts.loading();
			case predicates.gotError(props): return containerShortcuts.error();
			default: throw new Error('Undefined state');
		}

		function render (props) {
			return (
				<div className="component-container-list component-extensions">
					{ FloatingButton({ entity: 'extensions'}) }
					<ul>
						{props.result.map(
							(item, index) => ListItem({ ...item, index })
						)}
					</ul>
				</div>
			)
		}
	}
};

export default connect(state => ({
		status: selectors.getPageStatus(state),
		result: selectors.getResult(state),
	}),
	dispatch => bindActionCreators(actions, dispatch)
)(MyComponent);
