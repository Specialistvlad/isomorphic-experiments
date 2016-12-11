import { handleActions } from 'redux-actions';
import { browserHistory } from 'react-router'
import hab from '../../shared/http-action-builder';

const MAIN_PREFIX = 'extmodule';
const ENTITY = MAIN_PREFIX+'s';

// action consts
export const consts = {
	FETCH_PENDING: MAIN_PREFIX+'/FETCH_PENDING',
	FETCH_SUCCESS: MAIN_PREFIX+'/FETCH_SUCCESS',
	FETCH_ERROR: MAIN_PREFIX+'/FETCH_ERROR',
	SUBMIT_PENDING: MAIN_PREFIX+'/SUBMIT',
	SUBMIT_SUCCESS: MAIN_PREFIX+'/SUBMIT_SUCCESS',
	SUBMIT_ERROR: MAIN_PREFIX+'/SUBMIT_ERROR',
}

// initial state
export const initialState = {
	result: {},
	status: null, // pending, success, new, error

	submitStatus: null, // null, pending, success, error
	submitErrors: null, // description of all errored fields
};

// reducers
export default handleActions({
	[consts.FETCH_PENDING]: (state, action) => {
		return {
			status: 'pending',
			result: {},
			submitErrors: null,
		}
	},
	[consts.FETCH_SUCCESS]: (state, action) => {
		return {
			status: action.payload.data && action.payload.data._id ? 'success' : 'new',
			result: action.payload.data,
			submitErrors: null,
		}
	},
	[consts.FETCH_ERROR]: (state, action) => {
		if (action.payload instanceof Error) {
			console.error(action.payload.stack);
		}
		return {
			status: 'error',
			result: {},
		}
	},
	[consts.SUBMIT_PENDING]: (state, action) => {
		return Object.assign({}, state, {
			submitStatus: 'pending',
			submitErrors: null,
		});
	},
	[consts.SUBMIT_SUCCESS]: (state, action) => {
		return Object.assign({}, state, {
			submitStatus: 'success',
			submitErrors: null,
		});
	},
	[consts.SUBMIT_ERROR]: (state, action) => {
		const errors = action.payload &&
			action.payload.response && action.payload.response.data ?
			action.payload.response.data.data : {};

		return Object.assign({}, state, {
			submitStatus: 'error',
			submitErrors: errors,
		});
	},
}, initialState);

// actions
export const actions = {
	fetch: (params) => {
		if (!params.id) {
			return dispatch => dispatch({
				type: consts.FETCH_SUCCESS,
				payload: { status: 'new', data: {} }
			});
		} else {
			return hab({
				entity: ENTITY,
				actionsPrefix: MAIN_PREFIX+'/FETCH',
				path: params.id,
			});
		}
	},

	formSubmit: (data) => {
		return (dispatch, getState) => {
			return hab({
				data,
				entity: ENTITY,
				actionsPrefix: MAIN_PREFIX+'/SUBMIT',
				method: data._id ? 'PUT' : 'POST',
				path: data._id ? data._id : null,
			})(dispatch, getState)
			.then((res) => {
				if (!selectors.getSubmitErrors(getState())){
					browserHistory.goBack();
				}
				return res;
			});
		}
	},
}

// selectors
export const selectors = {
	getPageStatus: state => state[MAIN_PREFIX].status,
	getResult: state => state[MAIN_PREFIX].result,
	getSubmitStatus: state => state[MAIN_PREFIX].submitStatus,
	getSubmitErrors: state => state[MAIN_PREFIX].submitErrors,
}
