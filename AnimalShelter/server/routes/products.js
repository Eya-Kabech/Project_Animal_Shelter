const Products = require("../controllers/product.controller");

module.exports = (app)=>{
    app.get("/api/product",Products.findAllProducts)
    app.post("/api/product",Products.createNewProduct)
    app.delete("/api/:id/product",Products.deleteAnExistingProduct)
};