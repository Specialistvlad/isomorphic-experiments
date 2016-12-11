import React from 'react';
import { Field, reduxForm } from 'redux-form'
import FormFooter from '../../components/form-footer';
import FormInput from '../../components/form-input';

const SimpleForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<FormInput name="title" icon="title"
				submitError={props.submitErrors && props.submitErrors.code}/>
			<FormInput name="code" icon="code"
				submitError={props.submitErrors && props.submitErrors.code}/>
			<FormFooter {...props}/>
		</form>
	);
}

export default reduxForm({
	form: 'extmodule',
	enableReinitialize: true,
})(SimpleForm);
