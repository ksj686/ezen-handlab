const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.listProduct);
router.get("/spec", productController.getProductBySpec);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProduct);
router.delete("/:id", productController.deleteProduct);
router.put("/:id", productController.updateProduct);
module.exports = router;
