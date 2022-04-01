/* -=================== Error Handlers ===================- */
const joi = require('joi');

/* -======================= Messages =======================- */
const { request } = require('../messages');

const idKey = 'product_id'; // keep snake_case

const saleSchema = joi.array().items(joi.object({
  [idKey]: joi.number().min(1).required().messages({
    'number.base': request.productId.invalid,
    'number.min': request.productId.invalid,
    'any.required': request.productId.required,
  }),
  quantity: joi.number().min(1).required().messages({
    'number.base': request.quantity.invalid,
    'number.min': request.quantity.invalid,
    'any.required': request.quantity.required,
  }),
}));

const validateSale = (body) => {
  const { error } = saleSchema.validate(body);
  if (error) throw error;
};

module.exports = validateSale;
