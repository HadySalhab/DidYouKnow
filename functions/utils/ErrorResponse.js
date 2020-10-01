class ErrorResponse extends global.Error {
	constructor(message, statusCode) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}
module.exports = ErrorResponse;
