import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Field } from 'redux-form'

import * as pr from '../../shared/component-state-predicates.js';
import './style.scss';

export default class FormFooter extends Component {
	render() {
		const props = this.props;
		const buttonClass = `btn waves-effect waves-light ${pr.gotSubmitErrors(props) ? 'red darken-2':''}`;
		const icon = <i className="material-icons left">done</i>;
		const preloader = (
			<span className="preloader-wrapper small active">
				<div className="spinner-layer spinner-yellow-only">
					<div className="circle-clipper left">
						<div className="circle"></div>
					</div><div className="gap-patch">
						<div className="circle"></div>
					</div><div className="circle-clipper right">
						<div className="circle"></div>
					</div>
				</div>
			</span>
		);

		let text;
		if (pr.gotSubmitErrors(props)) {
			text = 'Saving error';
		} else if (pr.isNew(props)) {
			text = pr.isPendingSubmit(props) ? 'Creating' : 'Create';
		} else {
			text = pr.isPendingSubmit(props) ? 'Saving' : 'Save';
		}

		// onClick={browserHistory.goBack}
		return (
			<div className="form-footer">
				<button type="button"
					className="btn waves-effect waves-light">
					<i className="material-icons left">cancel</i>
					Back
				</button>

				<button type="submit" className={buttonClass}
					disabled={pr.isPendingSubmit(props)}>
					{!pr.isPendingSubmit(props) && icon}
					{!pr.isPendingSubmit(props) && text}
					{pr.isPendingSubmit(props) && preloader}
				</button>
			</div>
		);
	}
}
