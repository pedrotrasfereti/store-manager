/* -======================= Models =======================- */
const productsModel = require('../models/productsModel');

/* -======================= Errors =======================- */
const ConflictError = require('./errors/conflict');
const NotFoundError = require('./errors/notFound');

/* -======================= Messages =======================- */
const messages = require('../utils/messages');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) throw new NotFoundError(messages.product.notFound);

  return product;
};

const create = async (name, quantity) => {
  const exists = await productsModel.getByName(name);
  if (exists) throw new ConflictError(messages.product.duplicated);

  const newProduct = await productsModel.create(name, quantity);
  return newProduct;
};

const update = async (id, name, quantity) => {
  const product = await productsModel.getById(id);
  if (!product) throw new NotFoundError(messages.product.notFound);

  const updatedProduct = await productsModel.update(
    id,
    name,
    quantity,
  );

  return updatedProduct;
};

const remove = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) throw new NotFoundError(messages.product.notFound);

  await productsModel.remove(id);

  return product;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
