import _ from 'lodash';
import http from 'axios';
import { normalize, arrayOf } from 'normalizr';
import composeApiUrl from './compose-api-url';

export default function createRequestAction (opts) {
	const startAction = (opts.actionsPrefix || opts.entity) + '_PENDING';
	const successAction = (opts.actionsPrefix || opts.entity) + '_SUCCESS';
	const errorAction = (opts.actionsPrefix || opts.entity) + '_ERROR';

	opts.timeout = opts.timeout || 3000;
	opts.url = composeApiUrl('/' + opts.entity);

	if (_.isArray(opts.path) && (opts.path.length > 0)) {
		opts.url += '/' + opts.path.join('/');
	} else if (_.isString(opts.path) || _.isNumber(opts.path)) {
		opts.url += '/' + opts.path;
	}

	return (dispatch, getState) => {
		dispatch({ type: startAction });
		return http(opts).then(res => {
			if (opts.normalizrSchema) {
				res.data = normalize(res.data, arrayOf(opts.normalizrSchema));
			}
			if (opts.prepare) {
				res.data = opts.prepare(res);
			}
			return res;
		})
		.then(result => dispatch({
			type: successAction,
			payload: { data: result.data, raw: result }
		}))
		.catch(error => dispatch({ type: errorAction, payload: error, error: true }))
	}
}
