const express = require("express");
const productController = require("../controllers/products.controller");
const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.send("From Product route.");
});

productRouter.get("/allProducts", productController.getAllProducts);
productRouter.post("/create", productController.crateNewProduct);
productRouter.patch("/updateProduct/:id", productController.updateProduct);
productRouter.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = productRouter;
