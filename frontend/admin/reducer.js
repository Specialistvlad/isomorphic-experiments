import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import extensions from './modules/extensions';
import extension from './modules/extension';
import extmodules from './modules/extmodules';
import extmodule from './modules/extmodule';
import stats from './modules/statistics';

export default combineReducers({
	routing,
	form,

	stats,
	extensions,
	extension,
	extmodules,
	extmodule,
});
