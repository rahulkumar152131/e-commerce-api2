import { ApplicationError } from "../../error-handler/applicationError.js";
import Category from "./category.schema.js";


import Product from "./product.schema.js";
class ProductRepository {

    async getAllProduct() {
        try {
            const products = await Product.findAll();
            return { success: true, msg: "Product retrieval successful", res: products };
        } catch (err) {
            // console.log("Error in product repository", err);
            throw new ApplicationError("Something went wrong with product collection", 500);
        }
    }
    async getAllCategory() {
        try {
            const category = await Category.findAll();
            return { success: true, msg: "Category retrieval successful", res: category };
        } catch (err) {
            // console.log("Error in product repository", err);
            throw new ApplicationError("Something went wrong with product collection", 500);
        }
    }

    async getOneProduct(id) {
        try {
            let product = await Product.findByPk(id);
            if(product){
                return { success: true, msg: "Product retrieval successful", res: product };
            }else{
                return { success: false, msg: "Product not found"};
            }

        } catch (err) {
            // console.log("Error in product repository", err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}
export default ProductRepository;