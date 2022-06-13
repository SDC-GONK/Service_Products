require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const controllers = require('./controllers/controllers');
// const router = require('./routes');

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// declare routes
// app.use(router);
app.get('/products', controllers.getProducts);
app.get('/products/:product_id', controllers.getProductInfo);
app.get('/products/:product_id/styles', controllers.getProductStyles);
app.get('/products/:product_id/related', controllers.getRelatedProducts);

app.listen(process.env.PORT, () => {
  console.log(`Products server listening on port ${process.env.PORT}`);
});
