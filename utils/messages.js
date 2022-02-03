const product = {
  duplicated: 'Product already exists',
  notFound: 'Product not found',
};

const sale = {
  notFound: 'Sale not found',
};

const request = {
  productId: {
    invalid: '"product_id" must be a number larger than or equal to 1',
    required: '"product_id" is required',
  },
  quantity: {
    invalid: '"quantity" must be a number larger than or equal to 1',
    required: '"quantity" is required',
  },
};

module.exports = {
  product,
  sale,
  request,
};
