const express = require("express");

const productsControllers = require("../controllers/products-controllers");

const router = express.Router();

router.get("/", productsControllers.getProducts);

router.get("/:productId", productsControllers.getProductById);

router.post("/", productsControllers.createProduct);

router.put("/:productId", productsControllers.updateProduct);

router.delete("/:productId", productsControllers.deleteProduct);

module.exports = router;