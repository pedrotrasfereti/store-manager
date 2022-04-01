/* -======================= Models =======================- */
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

/* -======================= Errors =======================- */
const NotFoundError = require('./errors/notFound');
const AmountError = require('./errors/amount');

/* -======================= Messages =======================- */
const messages = require('../utils/messages');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  if (sale.length <= 0) throw new NotFoundError(messages.sale.notFound);

  return sale;
};

const validateSale = async (item) => {
  const idKey = 'product_id'; // keep snake_case
  const { [idKey]: productId, quantity: saleQty } = item;

  const { quantity: availableQty } = await productsModel
    .getById(productId);

  if (availableQty < saleQty) throw new AmountError();
};

const create = async (items) => {
  await Promise.all(items.map(async (item) => {
    await validateSale(item);
  }));

  const saleId = await salesModel.create();

  await Promise.all(items.map(async (item) => {
    const idKey = 'product_id'; // keep snake_case
    const { [idKey]: productId, quantity } = item;
    await salesModel.sell(saleId, productId, quantity);
  }));

  return {
    id: saleId,
    itemsSold: items,
  };
};

const update = async (saleId, updatedItems) => {
  const sale = await salesModel.getById(saleId);
  if (sale.length <= 0) throw new NotFoundError(messages.sale.notFound);

  await Promise.all(updatedItems.map(async (updatedItem) => {
    const idKey = 'product_id'; // keep snake_case
    const { [idKey]: productId, quantity: newQuantity } = updatedItem;
    await salesModel.update(saleId, productId, newQuantity);
  }));

  return {
    saleId,
    itemUpdated: updatedItems,
  };
};

const remove = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  if (sale.length <= 0) throw new NotFoundError(messages.sale.notFound);

  await salesModel.remove(saleId);

  return sale;
};

module.exports = {
  getAll,
  getById,
  validateSale,
  create,
  update,
  remove,
};
