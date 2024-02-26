import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgresDB.js";
import Product from "../product/product.schema.js";
import Order from "../order/order.schema.js";

export const CartItemModel = sequelize.define('Cart', {
    productID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Products',
            key: 'id',
        },
    },
    userID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        validate: {
            min: {
                args: [1],
                msg: 'Quantity must be greater than 1',
            },
        },
    },
});


// try {
//     await sequelize.sync();
//     console.log('Model synced with the database.');
// } catch (error) {
//     console.error('Error syncing model with the Carts table:', error);
// }

export default CartItemModel;


