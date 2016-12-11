import { handleActions } from 'redux-actions';
import { Schema  } from 'normalizr';
import hab from '../../shared/http-action-builder';

// action consts
export const consts = {
	FETCH_PENDING: 'extmodules/FETCH_PENDING',
	FETCH_SUCCESS: 'extmodules/FETCH_SUCCESS',
	FETCH_ERROR: 'extmodules/FETCH_ERROR',
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
		entity: 'extmodules',
		actionsPrefix: 'extmodules/FETCH',
		normalizrSchema: new Schema('extmodules', { idAttribute: '_id' }),
	}),
}

// selectors
export const selectors = {
	getPageStatus: state => state.extmodules.status,
	getResult: state => state.extmodules.result.map(id => state.extmodules.entities.extmodules[id]),
}
