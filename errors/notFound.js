/* -======================= Utils =======================- */
const { HTTP_NOT_FOUND } = require('../utils/statusCodes');

class NotFoundError {
  constructor(message) {
    this.message = message;
    this.code = HTTP_NOT_FOUND;
  }
}

module.exports = NotFoundError;
