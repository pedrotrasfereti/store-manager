/* -======================= Test =======================- */
const { expect } = require('chai');
const sinon = require('sinon');

/* -======================= Model =======================- */
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

/* -======================= Service =======================- */
const productsService = require('../../services/productsService');
const salesService = require('../../services/salesService');

describe('productsService', () => {
  describe('"getAll" gets all products from the products table', () => {
    describe('when the table is empty', () => {
      describe('the result', () => {
        before(() => {
          sinon.stub(productsModel, 'getAll').resolves([]);
        });

        it('is an array', async () => {
          const products = await productsService.getAll();
          expect(products).to.be.an('array');
        });

        it('is an empty array', async () => {
          const products = await productsService.getAll();
          expect(products).to.be.empty;
        });

        after(() => {
          productsModel.getAll.restore();
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

          sinon.stub(productsModel, 'getAll').resolves(payload);
        });

        it('is an array', async () => {
          const products = await productsService.getAll();
          expect(products).to.be.an('array');
        });

        it('is not empty', async () => {
          const products = await productsService.getAll();
          expect(products).to.not.be.empty;
        });

        it('the contents are objects', async () => {
          const products = await productsService.getAll();
          products.map((product) => {
            expect(product).to.be.an('object');
          });
        });

        it('the contents have the "id", "name" and "quantity" keys', async () => {
          const result = await productsService.getAll();
          result.map((product) => {
            expect(product).to.include.all
              .keys('id', 'name', 'quantity');
          });
        });

        after(() => {
          productsModel.getAll.restore();
        });
      });
    });
  });

  describe('"getById" gets the product specified in the request', () => {
    describe('when the specified product exists', () => {
      describe('the result', () => {
        before(() => {
          const payload = {
            id: 1,
            name: 'Milk',
            quantity: 10,
          };

          sinon.stub(productsModel, 'getById').resolves(payload);
        });

        it('is an object', async () => {
          const product = await productsService.getById();
          expect(product).to.be.an('object');
        });

        it('has the "id", "name" and "quantity" keys', async () => {
          const product = await productsService.getById();
          expect(product).to.include.all
            .keys('id', 'name', 'quantity');
        });

        after(() => {
          productsModel.getById.restore();
        });
      });
    });
  });

  describe('"create" inserts a new product into the products table', () => {
    describe('when the arguments provided are valid', () => {
      describe('the result', () => {
        before(() => {
          const payload = {
            id: 1,
            name: 'Milk',
            quantity: 10,
          };

          sinon.stub(productsModel, 'getByName')
            .resolves(false);

          sinon.stub(productsModel, 'create')
            .resolves(payload);
        });

        it('is an object', async () => {
          const product = await productsService.create('Milk', 10);
          expect(product).to.be.an('object');
        });

        it('has the "id", "name" and "quantity" keys', async () => {
          const product = await productsService.create('Milk', 10);
          expect(product).to.include.all
            .keys('id', 'name', 'quantity');
        });

        it('the "name" matches the request body name', async () => {
          const { name } = await productsService.create('Milk', 10);
          expect(name).to.be.equal('Milk');
        });

        it('the "quantity" matches the request body quantity', async () => {
          const { quantity } = await productsService.create('Milk', 10);
          expect(quantity).to.be.equal(10);
        });

        after(() => {
          productsModel.getByName.restore();
          productsModel.create.restore();
        });
      });
    });
  });

  describe('"update" inserts a new sale into the sales table', () => {
    describe('when the arguments provided are valid', () => {
      describe('the result', () => {
        before(() => {
          const payload = {
            id: 1,
            name: 'Milk',
            quantity: 10,
          };

          sinon.stub(productsModel, 'getById').resolves(payload);
          sinon.stub(productsModel, 'update').resolves(payload);
        });

        it('is an object', async () => {
          const result = await productsService.update('Milk', 10);
          expect(result).to.be.an('object');
        });

        it('has the "name" and "quantity" keys', async () => {
          const sale = await productsService.update('Milk', 10);
          expect(sale).to.include.all
            .keys('name', 'quantity');
        });

        it('"id" matches the request product id', async () => {
          const { id } = await productsService.update('Milk', 10);
          expect(id).to.be.equal(1);
        });

        after(() => {
          productsModel.getById.restore();
          productsModel.update.restore();
        });
      });
    });
  });
});

describe('salesService', () => {
  describe('"getAll" gets all sales from the sales table', () => {
    describe('when the table is empty', () => {
      describe('the result', () => {
        before(() => {
          sinon.stub(salesModel, 'getAll').resolves([]);
        });

        it('is an array', async () => {
          const sales = await salesService.getAll();
          expect(sales).to.be.an('array');
        });

        it('is an empty array', async () => {
          const sales = await salesService.getAll();
          expect(sales).to.be.empty;
        });

        after(() => {
          salesModel.getAll.restore();
        });
      });
    });
  });

  describe('when the table is populated', () => {
    describe('the result', () => {
      before(() => {
        const payload = [
          {
            "id": 1,
            "name": "Milk",
            "quantity": 10
          },
          {
            "id": 2,
            "name": "Strawberry Pie",
            "quantity": 5,
          },
        ];

        sinon.stub(salesModel, 'getAll').resolves(payload);
      });

      it('is an array', async () => {
        const sales = await salesService.getAll();
        expect(sales).to.be.an('array');
      });

      it('is not empty', async () => {
        const sales = await salesService.getAll();
        expect(sales).to.not.be.empty;
      });

      it('the contents are objects', async () => {
        const sales = await salesService.getAll();
        sales.map((sale) => {
          expect(sale).to.be.an('object');
        });
      });

      it('the contents have the "id", "name" and "quantity" keys', async () => {
        const sales = await salesService.getAll();
        sales.map((sale) => {
          expect(sale).to.include.all
            .keys('id', 'name', 'quantity');
        });
      });

      after(() => {
        salesModel.getAll.restore();
      });
    });
  });

  describe('"getById" gets the sale specified in the request', () => {
    describe('when the specified sale exists', () => {
      describe('the result', () => {
        before(() => {
          const payload = {
            id: 1,
            name: 'Milk',
            quantity: 10,
          };

          sinon.stub(salesModel, 'getById').resolves(payload);
        });

        it('is an object', async () => {
          const sale = await salesService.getById();
          expect(sale).to.be.an('object');
        });

        it('has the "id", "name" and "quantity" keys', async () => {
          const sale = await salesService.getById();
          expect(sale).to.include.all
            .keys('id', 'name', 'quantity');
        });

        after(() => {
          salesModel.getById.restore();
        });
      });
    });
  });

  describe('"create" inserts a new sale into the sales table', () => {
    describe('when the arguments provided are valid', () => {
      describe('the result', () => {
        before(() => {
          const payload = {
            id: 1,
            itemsSold: [
              {
                product_id: 1,
                quantity: 2
              },
              {
                product_id: 2,
                quantity: 5
              },
            ],
          };

          sinon.stub(salesModel, 'create').resolves(payload);
        });

        it('is an object', async () => {
          const result = await salesService.create([]);
          expect(result).to.be.an('object');
        });

        it('has the "id" and "itemsSold" keys', async () => {
          const sale = await salesService.create([]);
          expect(sale).to.include.all
            .keys('id', 'itemsSold');
        });

        it('"itemsSold" is an array', async () => {
          const { itemsSold } = await salesService.create([]);
          expect(itemsSold).to.be.an('array');
        });

        it('the contents are objects', async () => {
          const { itemsSold } = await salesService.create([]);
          itemsSold.map((sale) => {
            expect(sale).to.be.an('object');
          });
        });

        it('the contents have the "product_id" and "quantity" keys', async () => {
          const { itemsSold } = await salesService.create([]);
          itemsSold.map((sale) => {
            expect(sale).to.include.all
              .keys('product_id', 'quantity');
          });
        });

        after(() => {
          salesModel.create.restore();
        });
      });
    });
  });

  describe('"update" inserts a new sale into the sales table', () => {
    describe('when the arguments provided are valid', () => {
      describe('the result', () => {
        before(() => {
          const payload = {
            saleId: 1,
            itemUpdated: [
              {
                product_id: 1,
                quantity: 2
              },
              {
                product_id: 2,
                quantity: 5
              },
            ],
          };

          sinon.stub(salesModel, 'getById').resolves([{ a: 1 }]);
          sinon.stub(salesModel, 'update').resolves(payload);
        });

        it('is an object', async () => {
          const result = await salesService.update(1, []);
          expect(result).to.be.an('object');
        });

        it('has the "saleId" and "itemUpdated" keys', async () => {
          const sale = await salesService.update(1, []);
          expect(sale).to.include.all
            .keys('saleId', 'itemUpdated');
        });

        it('"itemUpdated" is an array', async () => {
          const { itemUpdated } = await salesService.update(1, []);
          expect(itemUpdated).to.be.an('array');
        });

        it('the contents are objects', async () => {
          const { itemUpdated } = await salesService.update(1, []);
          itemUpdated.map((sale) => {
            expect(sale).to.be.an('object');
          });
        });

        after(() => {
          salesModel.getById.restore();
          salesModel.update.restore();
        });
      });
    });
  });
});
