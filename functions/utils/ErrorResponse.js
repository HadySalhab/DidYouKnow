class ErrorResponse extends global.Error {
	constructor(message, statusCode) {
		this.statusCode = statusCode;
		this.message = message;
	}
}
module.exports = ErrorResponse;
