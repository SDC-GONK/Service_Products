const db = require('../db');

exports.findAllProducts = (count, page) => {
  const query = `SELECT * FROM products ORDER BY id ASC LIMIT ${count} OFFSET ${(page - 1) * count}`;
  return db.query(query)
    .then((results) => results.rows)
    .catch((err) => console.log(err));
};

exports.findProductInfo = (product_id) => {
  const query = `
  SELECT
    p.id,
    p.name,
    p.slogan,
    p.description,
    p.category,
    p.default_price,
    json_agg(
      json_build_object(
        'feature', pi.feature,
        'value', pi.value
      )
    ) AS features
  FROM products p
        JOIN product_information pi
          ON p.id = pi.product_id
  WHERE p.id = ${product_id}
  GROUP BY p.id
  ORDER BY p.id ASC
  `;
  return db.query(query)
    .then((results) => results.rows[0])
    .catch((err) => console.log(err));
};

exports.findProductStyles = (product_id) => {
  query = `
  SELECT
    ps.product_id AS product_id,
    json_agg(
      json_build_object(
        'style_id', ps.id,
        'name', ps.name,
        'original_price', ps.original_price,
        'sale_price', ps.sale_price,
        'default?', ps.default_style,
        'photos', (
          SELECT
            json_agg(
              json_build_object(
                'thumbnail_url', ph.thumbnail_url,
                'url', ph.url
              )
            )
          FROM photos ph
          WHERE ph.product_styles_id = ps.id
          GROUP BY product_styles_id
        ),
        'skus', (
          SELECT
            json_object_agg(
              skus.id::text, json_build_object(
                'quantity', skus.quantity,
                'size', skus.size
              )
            )
          FROM skus
          WHERE skus.product_styles_id = ps.id
          GROUP BY product_styles_id
        )
      )
    ) AS results
      FROM product_styles ps
      WHERE ps.product_id = ${product_id}
      GROUP BY ps.product_id
  `;
  return db.query(query)
    .then((results) => {
      let finalObj;
      if (results.rows.length === 0) {
        finalObj = {
          'product_id': product_id,
          'results': []
        };
      } else {
        finalObj = results.rows[0];
      }
      return finalObj;
    })
    .catch((err) => console.log(err));
};

exports.findRelatedProducts = (product_id,) => {
  const query = `
  SELECT
    json_agg(related_product)
  FROM related_products
  WHERE parent_product = ${product_id}
  `;
  return db.query(query)
    .then((results) => results.rows[0].json_agg)
    .catch((err) => console.log(err));
};
