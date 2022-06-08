const mongoose = require('mongoose');

mongoose.connect('mongodb://:localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true });

const productsSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [
    {
      feature: String,
      value: String,
    },
  ],
  // styles
  results: [
    {
      style_id: Number,
      name: String,
      original_price: String,
      default_style: Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String,
        },
      ],
      skus: {
        sku_number: {
          quantity: Number,
          size: String,
        },
      },
    },
  ],
  // related
  relatedProduct: Number,
});

// const productsSchema = new mongoose.Schema({
//   product_id: Number,
//   name: String,
//   slogan: String,
//   description: String,
//   category: String,
//   default_price: Number,
// });

// const productInfoSchema = new mongoose.Schema({
//   product_id: Number,
//   name: String,
//   slogan: String,
//   description: String,
//   category: String,
//   default_price: Number,
//   features: {
//     feature: String,
//     value: String,
//   },
// });

// const productStylesSchema = new mongoose.Schema({
//   product_id: Number,
//   results: [
//     {
//       style_id: Number,
//       name: String,
//       original_price: String,
//       default_style: Boolean,
//       photos: [
//         {
//           thumbnail_url: String,
//           url: String,
//         },
//       ],
//       skus: {
//         sku_number: {
//           quantity: Number,
//           size: String,
//         },
//       },
//     },
//   ],
// });

// const relatedProductsSchema = new mongoose.Schema({
//   relatedProduct: Number,
// });

const Products = mongoose.model('products', productsSchema);
// const ProductInfo = mongoose.model('product_info', productInfoSchema);
// const productStyles = mongoose.model('product_styles', productStylesSchema);
module.exports.Products = Products;
