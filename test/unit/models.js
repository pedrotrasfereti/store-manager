/* -======================= Test =======================- */
const { expect } = require('chai');
const sinon = require('sinon');

/* -======================= Model =======================- */
const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

describe('productsModel', () => {
  describe('"getAll" gets all products from the products table', () => {
    describe('when the table is empty', () => {
      describe('the result', () => {
        before(() => {
          sinon.stub(connection, 'execute')
            .resolves([[]]);
        });

        it('is an array', async () => {
          const result = await productsModel.getAll();
          expect(result).to.be.an('array');
        });

        it('is an empty array', async () => {
          const result = await productsModel.getAll();
          expect(result).to.be.empty;
        });

        after(() => {
          connection.execute.restore();
        });
      });
    });

    describe('when the table is populated', () => {
      describe('the result', () => {
        before(() => {
          const payload = [
            {
              id: 1,
              name: 'Milk',
              quantity: 10,
            },
            {
              id: 2,
              name: 'Strawberry Pie',
              quantity: 5,
            },
          ];

          sinon.stub(connection, 'execute')
            .resolves([payload]);
        });

        it('is an array', async () => {
          const result = await productsModel.getAll();
          expect(result).to.be.an('array');
        });

        it('is not empty', async () => {
          const result = await productsModel.getAll();
          expect(result).to.not.be.empty;
        });

        it('the contents are objects', async () => {
          const result = await productsModel.getAll();
          result.map((product) => {
            expect(product).to.be.an('object');
          });
        });

        it('the contents have the "id", "name" and "quantity" keys', async () => {
          const result = await productsModel.getAll();
          result.map((product) => {
            expect(product).to.include.all
              .keys('id', 'name', 'quantity');
          });
        });

        after(() => {
          connection.execute.restore();
        });
      });
    });
  });

  describe('"getById" gets the product specified in the request', () => {
    describe('when the specified product exists', () => {
      describe('the result', () => {
        before(() => {
          const payload = [
            {
              id: 1,
              name: 'Milk',
              quantity: 10,
            },
          ];

          sinon.stub(connection, 'execute')
            .resolves([payload]);
        });

        it('is an object', async () => {
          const product = await productsModel.getById();
          expect(product).to.be.an('object');
        });

        it('has the "id", "name" and "quantity" keys', async () => {
          const product = await productsModel.getById();
          expect(product).to.include.all
            .keys('id', 'name', 'quantity');
        });

        after(() => {
          connection.execute.restore();
        });
      });
    });

    describe('when the specified product does not exist', () => {
      describe('the result', () => {
        before(() => {
          sinon.stub(connection, 'execute')
            .resolves([[]]);
        });

        it('is undefined', async () => {
          const product = await productsModel.getById();
          expect(product).to.be.undefined;
        });

        after(() => {
          connection.execute.restore();
        });
      });
    });
  });

  describe('"getByName" gets the product specified in the request', () => {
    describe('when the specified product exists', () => {
      describe('the result', () => {
        before(() => {
          const payload = [
            {
              id: 1,
              name: 'Milk',
              quantity: 10,
            },
          ];

          sinon.stub(connection, 'execute')
            .resolves([payload]);
        });

        it('is an object', async () => {
          const product = await productsModel.getByName();
          expect(product).to.be.an('object');
        });

        it('has the "id", "name" and "quantity" keys', async () => {
          const product = await productsModel.getByName();
          expect(product).to.include.all
            .keys('id', 'name', 'quantity');
        });

        after(() => {
          connection.execute.restore();
        });
      });
    });

    describe('when the specified product does not exist', () => {
      describe('the result', () => {
        before(() => {
          sinon.stub(connection, 'execute')
            .resolves([[]]);
        });

        it('is undefined', async () => {
          const product = await productsModel.getByName();
          expect(product).to.be.undefined;
        });

        after(() => {
          connection.execute.restore();
        });
      });
    });
  });

  describe('"create" inserts a new product into the products table', () => {
    describe('when the arguments provided are valid', () => {
      describe('the result', () => {
        before(() => {
          sinon.stub(connection, 'execute')
            .resolves([{ insertId: 1 }]);
        });

        it('is an object', async () => {
          const result = await productsModel.create('Milk', 10);
          expect(result).to.be.an('object');
        });

        it('has the "id", "name" and "quantity" keys', async () => {
          const product = await productsModel.create('Milk', 10);
          expect(product).to.include.all
            .keys('id', 'name', 'quantity');
        });

        it('"id" is equal to the "insertId"', async () => {
          const product = await productsModel.create('Milk', 10);
          expect(product.id).to.be.equal(1);
        });

        after(() => {
          connection.execute.restore();
        });
      });
    });
  });

  describe('"update" updates an existing product', () => {
    describe('when the arguments provided are valid', () => {
      describe('the result', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves();
        });

        it('is an object', async () => {
          const updatedProduct = await productsModel
            .update(1, 'Milk', 10);
          expect(updatedProduct).to.be.an('object');
        });

        it('has the "id", "name" and "quantity" keys', async () => {
          const updatedProduct = await productsModel
            .update(1, 'Milk', 10);
          expect(updatedProduct).to.include.all
            .keys('id', 'name', 'quantity');
        });

        after(() => {
          connection.execute.restore();
        });
      });
    });
  });

  describe('"remove" removes an existing product', () => {
    describe('when the arguments provided are valid', () => {
      describe('the result', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves();
        });

        it('removes the product from the products table', async () => {
          await productsModel.remove();
        });

        after(() => {
          connection.execute.restore();
        });
      });
    });
  });
});

describe('salesModel', () => {
  describe('"getAll" gets all sales from the sales table', () => {
    describe('when the table is empty', () => {
      describe('the result', () => {
        before(() => {
          sinon.stub(connection, 'execute')
            .resolves([[]]);
        });

        it('is an array', async () => {
          const result = await salesModel.getAll();
          expect(result).to.be.an('array');
        });

        it('is an empty array', async () => {
          const result = await salesModel.getAll();
          expect(result).to.be.empty;
        });

        after(() => {
          connection.execute.restore();
        });
      });
    });

    describe('when the table is populated', () => {
      describe('the result', () => {
        before(() => {
          const payload = [
            {
              id: 1,
              name: 'Milk',
              quantity: 10,
            },
            {
              id: 2,
              name: 'Strawberry Pie',
              quantity: 5,
            },
          ];

          sinon.stub(connection, 'execute')
            .resolves([payload]);
        });

        it('is an array', async () => {
          const result = await salesModel.getAll();
          expect(result).to.be.an('array');
        });

        it('is not empty', async () => {
          const result = await salesModel.getAll();
          expect(result).to.not.be.empty;
        });

        it('the contents are objects', async () => {
          const result = await salesModel.getAll();
          result.map((product) => {
            expect(product).to.be.an('object');
          });
        });

        it('the contents have the "id", "name" and "quantity" keys', async () => {
          const result = await salesModel.getAll();
          result.map((sale) => {
            expect(sale).to.include.all
              .keys('id', 'name', 'quantity');
          });
        });

        after(() => {
          connection.execute.restore();
        });
      });
    });
  });
});
