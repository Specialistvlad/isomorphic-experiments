import React, { Component } from 'react';
import { Field } from 'redux-form'
import capitalize from 'lodash/capitalize';

class FormInput extends Component {
	render() {
		const props = this.props;
		return (
			<div className="input-field">
				{props.icon && <i className="material-icons prefix">
					{ props.icon }
				</i>}
				<Field name={props.name}
					component="input"
					type="text"
					placeholder={props.placeholder ? props.placeholder : ''}
					className={props.submitError ? 'invalid' : ''}
				/>
				<label data-error={props.submitError} className="active">
					{props.title || capitalize(props.name)}
				</label>
			</div>
		);
	}
}

export default FormInput;
