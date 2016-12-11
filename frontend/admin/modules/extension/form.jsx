import React from 'react';
import { Field, reduxForm } from 'redux-form';

import FormFooter from '../../components/form-footer';
import FormInput from '../../components/form-input';

const SimpleForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<FormInput name="title"
				submitError={props.submitErrors && props.submitErrors.title}/>
			<FormInput name="domain"
				submitError={props.submitErrors && props.submitErrors.domain}/>
			<FormInput name="extension_id" title="Extension ID"
				 submitError={props.submitErrors && props.submitErrors.extension_id}/>
			<FormFooter {...props}/>
		</form>
	);
}

export default reduxForm({
	form: 'extension',
	enableReinitialize: true,
})(SimpleForm);
