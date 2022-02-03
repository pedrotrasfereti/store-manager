/* -======================= Test =======================- */
const { expect } = require('chai');
const sinon = require('sinon');

/* -======================= Service =======================- */
const productsService = require('../../services/productsService');
const salesService = require('../../services/salesService');

/* -======================= Controller =======================- */
const productsController = require('../../controllers/productsController');
const salesController = require('../../controllers/salesController');

describe('productsController', () => {
  describe('"getAll" gets all products from the products table', () => {
    describe('when the table is empty', () => {
      const fakeReq = {};
      const fakeRes = {};

      describe('the response', () => {
        before(() => {
          sinon.stub(productsService, 'getAll').resolves([]);

          fakeReq.body = {};
          fakeRes.status = sinon.stub().returns(fakeRes);
          fakeRes.json = sinon.stub().returns();
        });

        it('has a 200 status code', async () => {
          await productsController.getAll(fakeReq, fakeRes);

          expect(fakeRes.status.calledWith(200)).to.be.true;
        });

        it('has a JSON array', async () => {
          await productsController.getAll(fakeReq, fakeRes);

          expect(fakeRes.json.calledWith(sinon.match.array)).to.be.true;
        });

        after(() => {
          productsService.getAll.restore();
        });
      });
    });

    describe('when the table is populated', () => {
      const fakeReq = {};
      const fakeRes = {};

      describe('the response', () => {
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

          sinon.stub(productsService, 'getAll').resolves(payload);

          fakeReq.body = {};
          fakeRes.status = sinon.stub().returns(fakeRes);
          fakeRes.json = sinon.stub().returns();
        });

        it('has the 200 status code', async () => {
          await productsController.getAll(fakeReq, fakeRes);
          expect(fakeRes.status.calledWith(200)).to.be.true;
        });

        it('has a JSON array', async () => {
          await productsController.getAll(fakeReq, fakeRes);
          expect(fakeRes.json.calledWith(sinon.match.array)).to.be.true;
        });

        it('the contents are objects', async () => {
          await productsController.getAll(fakeReq, fakeRes);

          const thirdCallArguments = fakeRes.json.args[2];
          const firstArgument = thirdCallArguments[0];
          const product = firstArgument[0];

          expect(product).to.be.an('object');
        });

        it('the contents have the "id", "name" and "quantity" keys', async () => {
          await productsController.getAll(fakeReq, fakeRes);

          const thirdCallArguments = fakeRes.json.args[2];
          const firstArgument = thirdCallArguments[0];
          const product = firstArgument[0];

          expect(product).to.include.all
            .keys('id', 'name', 'quantity');
        });

        after(() => {
          productsService.getAll.restore();
        });
      });
    });
  });

  describe('"create" inserts a new product into the products table', () => {
    describe('when the arguments provided are valid', () => {
      describe('the response', () => {
        const fakeReq = {};
        const fakeRes = {};

        before(() => {
          fakeReq.body = {
            name: 'Chocolate Bar',
            quantity: 10,
          };

          fakeRes.status = sinon.stub().returns(fakeRes);
          fakeRes.json = sinon.stub().returns();

          sinon.stub(productsService, 'create')
            .resolves(false);
        });

        it('has a 201 status code', async () => {
          await productsController.create(fakeReq, fakeRes);
          expect(fakeRes.status.calledWith(201)).to.be.true;
        });


        it('has a JSON object', async () => {
          await productsController.create(fakeReq, fakeRes);
          expect(fakeRes.json.calledWith({
            id: 1,
            name: 'Chocolate Bar',
            quantity: 10,
          }));
        });

        after(() => {
          productsService.create.restore();
        });
      });
    });
  });
});

describe('salesController', () => {
  describe('"getAll" gets all sales from the sales table', () => {
    describe('when the table is empty', () => {
      const fakeReq = {};
      const fakeRes = {};

      describe('the response', () => {
        before(() => {
          sinon.stub(salesService, 'getAll').resolves([]);

          fakeReq.body = {};
          fakeRes.status = sinon.stub().returns(fakeRes);
          fakeRes.json = sinon.stub().returns();
        });

        it('has a 200 status code', async () => {
          await salesController.getAll(fakeReq, fakeRes);

          expect(fakeRes.status.calledWith(200)).to.be.true;
        });

        it('has a JSON array', async () => {
          await salesController.getAll(fakeReq, fakeRes);

          expect(fakeRes.json.calledWith(sinon.match.array)).to.be.true;
        });

        after(() => {
          salesService.getAll.restore();
        });
      });
    });

    describe('when the table is populated', () => {
      const fakeReq = {};
      const fakeRes = {};

      describe('the response', () => {
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

          sinon.stub(salesService, 'getAll').resolves(payload);

          fakeReq.body = {};
          fakeRes.status = sinon.stub().returns(fakeRes);
          fakeRes.json = sinon.stub().returns();
        });

        it('has the 200 status code', async () => {
          await salesController.getAll(fakeReq, fakeRes);
          expect(fakeRes.status.calledWith(200)).to.be.true;
        });

        it('has a JSON array', async () => {
          await salesController.getAll(fakeReq, fakeRes);
          expect(fakeRes.json.calledWith(sinon.match.array)).to.be.true;
        });

        it('the contents are objects', async () => {
          await salesController.getAll(fakeReq, fakeRes);

          const thirdCallArguments = fakeRes.json.args[2];
          const firstArgument = thirdCallArguments[0];
          const sale = firstArgument[0];

          expect(sale).to.be.an('object');
        });

        it('the contents have the "id", "name" and "quantity" keys', async () => {
          await salesController.getAll(fakeReq, fakeRes);

          const thirdCallArguments = fakeRes.json.args[2];
          const firstArgument = thirdCallArguments[0];
          const sale = firstArgument[0];

          expect(sale).to.include.all
            .keys('id', 'name', 'quantity');
        });

        after(() => {
          salesService.getAll.restore();
        });
      });
    });
  });
});
