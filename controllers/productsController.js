/* -======================= Router =======================- */
const products = require('express').Router();

/* -=================== Error Handlers ===================- */
const rescue = require('express-rescue');

/* -======================= Utils =======================- */
const {
  HTTP_OK,
  HTTP_CREATED,
} = require('../utils/statusCodes');

/* -======================= Schemas =======================- */
const validateProduct = require('../schemas/productSchema');

/* -======================= Services =======================- */
const productsService = require('../services/productsService');

/* -====================== Middlewares ======================- */
const getAll = async (_req, res, _next) => {
  const result = await productsService.getAll();

  res
    .status(HTTP_OK)
    .json(result);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const product = await productsService.getById(id);

  res
    .status(HTTP_OK)
    .json(product);
};

const create = async (req, res, _next) => {
  validateProduct(req.body);

  const { name, quantity } = req.body;
  const newProduct = await productsService.create(name, quantity);

  res
    .status(HTTP_CREATED)
    .json(newProduct);
};

const update = async (req, res, _next) => {
  validateProduct(req.body);

  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await productsService
    .update(id, name, quantity);

  res
    .status(HTTP_OK)
    .json(updatedProduct);
};

const remove = async (req, res, _next) => {
  const { id } = req.params;
  const deletedProduct = await productsService.remove(id);

  res
    .status(HTTP_OK)
    .json(deletedProduct);
};

/* GET /products */
products.get('/', rescue(getAll));

/* GET /products/:id */
products.get('/:id', rescue(getById));

/* POST /products */
products.post('/', rescue(create));

/* PUT /products/:id */
products.put('/:id', rescue(update));

/* DELETE /products/:id */
products.delete('/:id', rescue(remove));

module.exports = {
  products,
  getAll,
  getById,
  create,
  update,
  remove,
};
