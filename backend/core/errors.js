class NotFound extends Error {
	constructor(message) {
		super(message);
		this.message = message;
		this.name = 'NotFound';
	}
}

class ValidationError extends Error {
	constructor(data) {
		const msg = 'ValidationError';
		super(msg);
		this.message = msg;
		this.name = msg;
		this.data = data;
	}
}

module.exports = {
	NotFound,
	ValidationError,
}
