import CartItemModel from "../features/cartItem/cartItem.schema.js";
import Order from "../features/order/order.schema.js";
import Product from "../features/product/product.schema.js";

const callAssociations = () => {
    CartItemModel.belongsTo(Product, { foreignKey: 'productID', as: 'products' });
};

export default callAssociations;