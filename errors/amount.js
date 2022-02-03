/* -======================= Utils =======================- */
const { HTTP_UNPROCESSABLE_ENTITY } = require('../utils/statusCodes');

class AmountError {
  constructor() {
    this.message = 'Such amount is not permitted to sell';
    this.code = HTTP_UNPROCESSABLE_ENTITY;
  }
}

module.exports = AmountError;
