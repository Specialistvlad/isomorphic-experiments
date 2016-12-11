export default function reduxWaitMe (deferred, timeout = 10000) {
	const timer = setTimeout(() =>
		deferred.reject(new Error('timeout')), timeout);

	let actionsList = [];
	let alreadyResolved = false;

	return ({ getState }) => (next) => (action) => {
		// Prevent dispatching everything, when already dispathed and got result!
		if (alreadyResolved) {
			return null;
		}

		if (action && action.type) {
			// console.log('base', action);
			if (isStartPattern(action.type)) {
				let tmp = replaceStartPattern(action.type);
				if (!alreadyPresent(tmp)) {
					actionsList.push(tmp);
					// console.log('add', action.type);
				} else {
					// console.log('already present', action.type);
				}
			} else if (isEndPattern(action.type)) {
				// console.log('rem', action.type);
				let tmp = replaceEndPattern(action.type);
				actionsList = actionsList.filter(item => item !== tmp);
			}

			if (actionsList.length === 0) {
				clearTimeout(timer);
				alreadyResolved = true;
			}
		}

		// Give control to another middleware
		let returnValue = next(action);

		// If dispatching was end, resolve deffered
		if (alreadyResolved) {
			deferred.resolve(getState());
		}
		return returnValue
	}

	function alreadyPresent(str) {
		return actionsList.indexOf(str) >= 0;
	}

	function isStartPattern(str) {
		return str.indexOf('_PENDING') >= 0;
	}

	function replaceStartPattern(str) {
		return str.replace('_PENDING', '');
	}

	function isEndPattern(str) {
		const result =
			str.indexOf('_SUCCESS') >= 0 ||
			str.indexOf('_FULFILL') >= 0 ||
			str.indexOf('_ERROR') >= 0 ||
			str.indexOf('_REJECT') >= 0;
		return result;
	}

	function replaceEndPattern(str) {
		return str
			.replace('_SUCCESS', '')
			.replace('_FULFILL', '')
			.replace('_ERROR', '')
			.replace('_REJECT', '');
	}
}
