/* -======================= Models =======================- */
const productsModel = require('../models/productsModel');

/* -======================= Errors =======================- */
const ConflictError = require('./errors/conflict');
const NotFoundError = require('./errors/notFound');

/* -======================= Messages =======================- */
const messages = require('../utils/messages');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) throw new NotFoundError(messages.product.notFound);

  return product;
};

const create = async (name, quantity) => {
  const exists = await productsModel.getByName(name);
  if (exists) throw new ConflictError(messages.product.duplicated);

  return await productsModel.create(name, quantity);
};

const update = async (id, name, quantity) => {
  const product = await productsModel.getById(id);
  if (!product) throw new NotFoundError(messages.product.notFound);

  return await productsModel.update(
    id,
    name,
    quantity,
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
