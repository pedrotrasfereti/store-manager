/* -======================= Router =======================- */
const sales = require('express').Router();

/* -=================== Error Handlers ===================- */
const rescue = require('express-rescue');

/* -======================= Utils =======================- */
const {
  HTTP_OK,
  HTTP_CREATED,
} = require('../utils/statusCodes');

/* -======================= Schemas =======================- */
const validateSale = require('../utils/joi_schemas/saleSchema');

/* -======================= Services =======================- */
const salesService = require('../services/salesService');

/* -====================== Middlewares ======================- */
const getAll = async (_req, res, _next) => {
  const result = await salesService.getAll();

  res
    .status(HTTP_OK)
    .json(result);
};

const getById = async (req, res, _next) => {
  const { id: saleId } = req.params;
  const sale = await salesService.getById(saleId);

  res
    .status(HTTP_OK)
    .json(sale);
};

const create = async (req, res, _next) => {
  const { body: items } = req;

  validateSale(items);

  const newSale = await salesService.create(items);

  res
    .status(HTTP_CREATED)
    .json(newSale);
};

const update = async (req, res, _next) => {
  const {
    body: updatedItems,
    params: {
      id: saleId,
    },
  } = req;

  validateSale(updatedItems);

  const updatedSale = await salesService
    .update(saleId, updatedItems);

  res
    .status(HTTP_OK)
    .json(updatedSale);
};

const remove = async (req, res, _next) => {
  const { id: saleId } = req.params;

  const deletedSale = await salesService.remove(saleId);

  res
    .status(HTTP_OK)
    .json(deletedSale);
};

/* GET /sales */
sales.get('/', rescue(getAll));

/* GET /sales/:id */
sales.get('/:id', rescue(getById));

/* POST /sales */
sales.post('/', rescue(create));

/* PUT /sales/:id */
sales.put('/:id', rescue(update));

/* DELETE /sales/:id */
sales.delete('/:id', rescue(remove));

module.exports = {
  sales,
  getAll,
  getById,
  create,
  update,
  remove,
};
