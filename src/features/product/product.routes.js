
//1. Import express.
import express from "express";
import ProductController from "./product.controller.js";

const productRouter = express.Router();

const productController = new ProductController();
productRouter.get("/get-products", productController.getAllProducts);
productRouter.get("/get-categories", productController.getAllCategory);
productRouter.get("/get-one/:id", productController.getOneProduct);

export default productRouter;