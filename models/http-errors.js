class HttpError extends Error {
  constructor(message, errorCode) {
    super(message)
    this._code = errorCode
  }

  get code() {
    return this._code
  }

  set code(code) {
    this._code = code
  }
}

module.exports = HttpError
