const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_image:String,
    product_name: String,
    product_description: String,
    product_price: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema, "products");
