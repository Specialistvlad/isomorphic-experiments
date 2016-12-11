import _ from 'lodash'

export function uninitialized (props) {
	return _.isNull(props.status) || _.isUndefined(props.status);
}

export function isPending (props) {
	return props.status === 'pending';
}

export function gotEntities (props) {
	return props.status === 'success' && !_.isEmpty(props.result);
}

export function gotEmpty (props) {
	return props.status === 'success' && _.isEmpty(props.result);
}

export function gotError (props) {
	return props.status === 'error';
}

export function isNew (props) {
	return props.status === 'new';
}

export function showDetails (props) {
	return props.status === 'new' || props.status === 'success';
}

export function isPendingSubmit (props) {
	return props.submitStatus === 'pending';
}

export function gotSubmitErrors (props) {
	return !!props.submitErrors;
}
