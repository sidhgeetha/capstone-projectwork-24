const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middlewares/auth");
// const upload = require("../middlewares/upload");

productRouter.post("/", auth.verifyToken, productController.createProduct);
// productRouter.post(
//   "/",
//   auth.verifyToken,
//   upload.single("product_image"),
//   productController.createProduct
// );

productRouter.get("/", auth.verifyToken, productController.getAllProducts);
// productRouter.get("/:id", auth.verifyToken, productController.getProduct);

module.exports = productRouter;
