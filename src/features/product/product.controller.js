import { ApplicationError } from "../../error-handler/applicationError.js";
import Category from "./category.schema.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository
    }
    getAllProducts = async (req, res, next) => {

        try {
            const response = await this.productRepository.getAllProduct();
            res.status(200).json(response);
        } catch (err) {
            // console.log("error in product repository", err);
            res.status(500).json({ success: false, msg: "Something went wrong" });
        }
    }
    getAllCategory = async (req, res, next) => {

        try {
            async function insertCategory() {
                try {
                    let category = [
                        { name: 'electronics' },
                        { name: 'men-s-wear' },
                        { name: 'women-s-wear' },
                        { name: 'jewellery' },
                    ]
                    const insertedProducts = await Category.bulkCreate(category);
                } catch (err) {
                    console.error('Error inserting products:', err);

                }

            }
            insertCategory();
            const response = await this.productRepository.getAllCategory();
            res.status(200).json(response);
        } catch (err) {
            // console.log("error in product repository", err);
            res.status(500).json({ success: false, msg: "Something went wrong" });
        }
    }

    getOneProduct = async (req, res, next) => {

        try {
            const response = await this.productRepository.getOneProduct(req.params.id);
            // console.log(product);
            if (!response.success) {
                return res.status(404).send(response);
            } else {
                return res.status(200).send(response);
            }
        } catch (err) {
            console.log("error in product repository", err);
            next(err);
        }

    }

}