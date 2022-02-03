/* -======================= Joi =======================- */
const joi = require('joi');

/* -======================= Utils =======================- */
const {
  HTTP_BAD_REQUEST,
  HTTP_UNPROCESSABLE_ENTITY,
} = require('../utils/statusCodes');

module.exports = (err, _req, res, next) => {
  if (!joi.isError(err)) {
    return next(err);
  }

  const errorMap = {
    'any.required': HTTP_BAD_REQUEST,
    'number.base': HTTP_UNPROCESSABLE_ENTITY,
    'number.min': HTTP_UNPROCESSABLE_ENTITY,
    'string.base': HTTP_UNPROCESSABLE_ENTITY,
    'string.min': HTTP_UNPROCESSABLE_ENTITY,
  };

  const status = errorMap[err.details[0].type];

  res
    .status(status)
    .json({ message: err.details[0].message });
};
