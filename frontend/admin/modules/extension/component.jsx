import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as predicates from '../../shared/component-state-predicates.js';
import * as containerShortcuts from '../../components/container-shortcuts';

import { actions, selectors } from './';
import Form from './form';

class MyComponent extends Component {
	constructor(props) {
		super(props);
		if (predicates.uninitialized(props)) {
			props.fetch(props.params);
		}
	}

	render() {
		const props = this.props;
		switch (true) {
			case predicates.uninitialized(props): return null;
			case predicates.showDetails(props): return details(props)
			case predicates.isPending(props): return containerShortcuts.loading();
			case predicates.gotError(props): return containerShortcuts.error();
			default: throw new Error(`Undefined state: ${props.status}`);
		}

		function details (props) {
			console.log('initialValues', props.data);
			return (
				<div className="component-container-details component-extension">
					<Form onSubmit={props.formSubmit}
						initialValues={props.data}
						{...props}>
					</Form>
				</div>
			)
		}
	}
};

export default connect(state => ({
		status: selectors.getPageStatus(state),
		data: selectors.getResult(state),
		submitStatus: selectors.getSubmitStatus(state),
		submitErrors: selectors.getSubmitErrors(state),
	}),
	dispatch => bindActionCreators(actions, dispatch)
)(MyComponent);
