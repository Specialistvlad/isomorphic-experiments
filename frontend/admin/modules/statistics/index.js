import { handleActions } from 'redux-actions';
import hab from '../../shared/http-action-builder';

// action consts
export const consts = {
	FETCH_PENDING: 'stats/FETCH_PENDING',
	FETCH_SUCCESS: 'stats/FETCH_SUCCESS',
	FETCH_ERROR: 'stats/FETCH_ERROR',
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
		}
	},
	[consts.FETCH_SUCCESS]: (state, action) => {
		return {
			status: 'success',
			result: action.payload.data,
		}
	},
	[consts.FETCH_ERROR]: (state, action) => {
		if (action.payload instanceof Error) {
			console.error(action.payload.stack);
		}
		return {
			status: 'error',
			result: [],
		}
	},
}, initialState);

// actions
export const actions = {
	fetch: () => hab({
		entity: 'stats',
		actionsPrefix: 'stats/FETCH',
	}),
}

// selectors
export const selectors = {
	getPageStatus: state => state.stats.status,
	getResult: state => state.stats.result,
}
