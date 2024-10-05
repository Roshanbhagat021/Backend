const ProductModel = require("../models/product.model");

const getAllProducts = async (req, res) => {
    try {
      const allProducts = await ProductModel.find();
      console.log(allProducts);
      res.json(allProducts);
    } catch (error) {
      console.log("error: ", error.message);
      res.status(500).send({ err: error.message });
    }
  }


  const crateNewProduct = async (req, res) => {
    const Product_details = req.body;
    try {
      // Two ways to save a new document into the db
  
      // .save() method
      // const new_Product = new ProductModel(Product_details)
      // const savedProduct = await new_Product.save()
      // res.status(201).json(savedProduct)
  
      // create method
      const new_Product = await ProductModel.create(Product_details);
      res.status(201).json(new_Product);
    } catch (error) {
      console.log("error: ", error.message);
      res.status(500).json({ err: error.message });
    }
  }


  const updateProduct =  async (req, res) => {
    // const updatedDetail = req.body;
    const { id } = req.params;
    console.log("id: ", id);
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      console.log(updatedProduct);
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.log("error: ", error.message);
      res.status(500).json({ err: error.message });
    }
  }


  const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      await ProductModel.findByIdAndDelete(id);
      res.send({ message: "Product deleted successfully" });
    } catch (error) {
      console.log("error: ", error.message);
      res.status(500).json({ err: error.message });
    }
  }
  

  module.exports ={getAllProducts, crateNewProduct, updateProduct, deleteProduct}