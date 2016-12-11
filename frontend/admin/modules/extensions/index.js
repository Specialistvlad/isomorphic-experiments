import { createAction, handleActions } from 'redux-actions';
import { Schema  } from 'normalizr';
import hab from '../../shared/http-action-builder';

// action consts
export const consts = {
	FETCH_PENDING: 'extensions/FETCH_PENDING',
	FETCH_SUCCESS: 'extensions/FETCH_SUCCESS',
	FETCH_ERROR: 'extensions/FETCH_ERROR',
}

// initial state
export const initialState = {
	result: [],
	status: null, // pending, success, error
};

// reducers
export default handleActions({
	[consts.FETCH_PENDING]: (state, action) => {
		return {
			status: 'pending',
			result: [],
			entities: {},
		}
	},
	[consts.FETCH_SUCCESS]: (state, action) => {
		console.log('consts.FETCH_SUCCESS', action);
		return {
			status: 'success',
			result: action.payload.data.result,
			entities: action.payload.data.entities,
		}
	},
	[consts.FETCH_ERROR]: (state, action) => {
		if (action.payload instanceof Error) {
			console.error(action.payload.stack);
		}
		return {
			status: 'error',
			result: [],
			entities: {},
		}
	},
}, initialState);

// actions
export const actions = {
	fetch: () => hab({
		entity: 'extensions',
		actionsPrefix: 'extensions/FETCH',
		normalizrSchema: new Schema('extensions', { idAttribute: '_id' }),
	}),

}

// selectors
export const selectors = {
	getPageStatus: state => state.extensions.status,
	getResult: state => state.extensions.result.map(id => state.extensions.entities.extensions[id]),
}
