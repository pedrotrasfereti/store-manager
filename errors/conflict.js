/* -======================= Utils =======================- */
const { HTTP_CONFLICT } = require('../utils/statusCodes');

class ConflictError {
  constructor(message) {
    this.message = message;
    this.code = HTTP_CONFLICT;
  }
}

module.exports = ConflictError;
