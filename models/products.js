var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  Id: String,
  title: String,
  description: String,
  google_product_category: String,
  product_type: String,
  link: String,
  image_link: String,
  additional_image_link: String,
  condition: String,
  availability: String,
  price: String,
  brand: String,
  gtin: String,
  mpn: String,
  item_group_id: String,
  collections: String,
  color: String,
  material: String,
  style: String,
  decor: String,
  pattern: String,
  size: String,
  gender: String,
  age_group: String,
  tax: String,
  shipping: String,
  shipping_weight: String,
  online_only: String,
  expiration_date: String,
  adwords_grouping: String,
  adwords_labels: String,
  mobile_link: String,
  custom_label_0: String,
  custom_label_1: String,
  custom_label_2: String,
  identifier_exists: String
});

ProductSchema.index({'$title': 'text'});
// ProductSchema.index({title: 'text', description: 'text'});

mongoose.model('Products', ProductSchema);
