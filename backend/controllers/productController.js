const Product = require("../models/product");

const productController = {
  createProduct: async (request, response) => {
    try {
      const {
        product_name,
        product_description,
        product_price,
        product_image,
      } = request.body;

      // const product_image = request.file ? request.file.path : "";

      // create a new job
      const newProduct = new Product({
        product_image,
        product_name,
        product_description,
        product_price,
      });

      await newProduct.save();

      response
        .status(201)
        .json({ message: "product created successfully", product: newProduct });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getAllProducts: async (request, response) => {
    try {
      //   // get the job id from the request parameters
      //   const { id } = request.params;

      //   // get the job
      //   const job = await Job.findById(id);

      const product = await Product.find();

      // if the job is not found
      if (!product) {
        return response.status(404).json({ message: "product not found" });
      }

      // send a success response
      response.status(200).json({ product });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = productController;
