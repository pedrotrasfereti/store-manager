/* -=================== Error Handlers ===================- */
const joi = require('joi');

/* -======================= Messages =======================- */
const { request } = require('../messages');

const productSchema = joi.object({
  name: joi.string().min(5).required(),
  quantity: joi.number().min(1).required().messages({
    'number.base': request.quantity.invalid,
    'number.min': request.quantity.invalid,
  }),
});

const validateProduct = (body) => {
  const { error } = productSchema.validate(body);
  if (error) throw error;
};

module.exports = validateProduct;
