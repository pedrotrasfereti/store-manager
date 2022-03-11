/* -=================== Connection ===================- */
const connection = require('./connection');

/* Tables */
/*
  * "sales": "id", "date"
  * "sales_products": "sale_id", "product_id", "quantity"
*/
const salesTable = 'StoreManager.sales';
const joinedTable = 'StoreManager.sales_products';

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity FROM ${salesTable}
    JOIN ${joinedTable}
    ON (${salesTable}.id = ${joinedTable}.sale_id)`,
  );

  const salesPretty = sales.map(({ sale_id: saleId, ...rest }) => ({
    saleId,
    ...rest,
  }));

  return salesPretty;
};

const getById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id, quantity FROM ${salesTable}
    JOIN ${joinedTable}
    ON (${salesTable}.id = ${joinedTable}.sale_id)
    WHERE sale_id = ?`,
    [saleId],
  );

  return sale;
};

const create = async () => {
  const [newSale] = await connection.execute(
    `INSERT INTO ${salesTable} (date) VALUES (NOW())`,
  );

  return newSale.insertId; // a.k.a SaleId
};

const sell = async (saleId, productId, quantity) => {
  await connection.execute(
    `INSERT INTO ${joinedTable} (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
    [saleId, productId, quantity],
  );
};

const update = async (saleId, productId, newQuantity) => {
  await connection.execute(
    `UPDATE ${joinedTable} SET quantity = ?
    WHERE (sale_id = ? AND product_id = ?)`,
    [newQuantity, saleId, productId],
  );
};

const remove = async (saleId) => {
  await connection.execute(
    `DELETE FROM ${salesTable} WHERE id = ?`,
    [saleId],
  );
};

module.exports = {
  getAll,
  getById,
  create,
  sell,
  update,
  remove,
};
