/* -======================= Utils =======================- */
const { HTTP_UNPROCESSABLE_ENTITY } = require('../../utils/statusCodes');

const messages = require('../../utils/messages');

class AmountError {
  constructor() {
    this.message = messages.sale.amountNotPermitted;
    this.code = HTTP_UNPROCESSABLE_ENTITY;
  }
}

module.exports = AmountError;
