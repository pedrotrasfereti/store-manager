/* -=================== Connection ===================- */
const connection = require('./connection');

/* Products table */
const table = 'StoreManager.products';

const getAll = async () => {
  const [products] = await connection.execute(
    `SELECT * FROM ${table}`,
  );

  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    `SELECT * FROM ${table} WHERE id = ?`,
    [id],
  );

  return product[0];
};

const getByName = async (name) => {
  const [product] = await connection.execute(
    `SELECT * FROM ${table} WHERE name = ?`,
    [name],
  );

  return product[0];
};

const create = async (name, quantity) => {
  const [newProduct] = await connection.execute(
    `INSERT INTO ${table} (name, quantity) VALUES (?, ?)`,
    [name, quantity],
  );

  return {
    id: newProduct.insertId,
    name,
    quantity,
  };
};

const update = async (id, name, quantity) => {
  await connection.execute(
    `UPDATE ${table} SET name = ?, quantity = ? WHERE id = ?`,
    [name, quantity, id],
  );

  return {
    id,
    name,
    quantity,
  };
};

const remove = async (id) => {
  await connection.execute(
    `DELETE FROM ${table} WHERE id = ?`,
    [id],
  );
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  remove,
};
