const models = require('../models/models');

exports.getProducts = (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  models.findAllProducts(count, page)
    .then((products) => res.send(products).status(200))
    .catch(() => res.sendStatus(500));
};

exports.getProductInfo = (req, res) => {
  // eslint-disable-next-line camelcase
  // console.log(req.params);
  const { product_id } = req.params;
  models.findProductInfo(product_id)
    .then((products) => res.send(products).status(200))
    .catch(() => res.sendStatus(500));
};

exports.getProductStyles = (req, res) => {
  // eslint-disable-next-line camelcase
  const { product_id } = req.params;
  console.log(product_id);

  try {
    const styles = models.findProductStyles(product_id);
    res.status(200).send(styles);
  } catch (err) {
    res.sendStatus(500);
  }
};

exports.getRelatedProducts = (req, res) => {
  // eslint-disable-next-line camelcase
  const { product_id } = req.params;
  models.findRelatedProducts(product_id)
    .then((products) => res.send(products).status(200))
    .catch(() => res.sendStatus(500));
};
