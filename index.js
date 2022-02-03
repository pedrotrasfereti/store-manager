/* -======================= Express =======================- */
const express = require('express');

/* -======================== Setup ========================- */
require('dotenv').config();

/* -===================== Middlewares =====================- */
const bodyParser = require('body-parser');
const {
  joiError,
  domainError,
  error,
} = require('./middlewares');

/* -===================== Controllers =====================- */
const { products } = require('./controllers/productsController');
const { sales } = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.send();
});

/* Routes */
app.use('/products', products);
app.use('/sales', sales);

/* Error Middlewares */
app.use(joiError);
app.use(domainError);
app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
