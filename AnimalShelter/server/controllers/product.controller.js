const Product = require("../models/model.product")

module.exports.findAllProducts = (req,res) =>{
    Product.find()
    .then((AllProduct) =>{
        console.log(">>>These are all my products ",AllProduct)
        res.json(AllProduct)
    })
    .catch((err)=>{
        res.json(err);
    })
};

module.exports.createNewProduct = (req, res) => {
    Product.create(req.body)
      .then((newlyCreatedProduct) => {
        res.json({ user: newlyCreatedProduct });
      })
      .catch((err) => {
        res.json(err);
      });
  };
  
  module.exports.deleteAnExistingProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.json({ result: result });
      })
      .catch((err) => {
        res.json(err);
      });
  };