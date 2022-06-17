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
app.get('/loaderio-5481d024c373977d499f84741e1740a1.txt', (req, res) => {
  res.send('loaderio-5481d024c373977d499f84741e1740a1');
});

app.listen(process.env.PORT, () => {
  console.log(`Products server listening on port ${process.env.PORT}`);
});
