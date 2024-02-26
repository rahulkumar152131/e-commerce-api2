


import CartItemModel from "../cartItem/cartItem.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import Order from "./order.schema.js";
import { sequelize } from "../../config/postgresDB.js";
import { Sequelize } from "sequelize";
import Product from "../product/product.schema.js";


export default class OrderRepository {
    async getAllOrder(userID) {
        try {
            const orders = await Order.findAll({
                where: { userID },
            });

            return orders;
        } catch (err) {
            console.log("Error in getting order", err);
            throw new ApplicationError("Something went wrong with order collection", 500);
        }
    }
    async getOneOrder(userID, orderID) {
        try {

            const order = await Order.findOne({
                where: {
                    id: orderID,
                    userID,
                },
            });

            if (order) {
                return { success: true, msg: 'Order getting successful', res: order }
            } else {
                return { success: false, msg: "Order not found" }

            }

        } catch (err) {
            // console.log("Error in getting order", err);
            throw new ApplicationError("Something went wrong with order collection", 500);
        }
    }

    async placeOrder(userID) {
        const t = await sequelize.transaction();

        try {
            const cartItems = await CartItemModel.findAll({ where: { userID }, transaction: t });

            if (cartItems.length <= 0) {
                return { success: false, msg: "Cart is Empty" };
            }

            const orderItems = cartItems.map(item => ({
                productID: item.productID,
                quantity: item.quantity,
            }));

            const newOrder = await Order.create({
                userID,
                items: orderItems,
            }, { transaction: t });

            cartItems.sort((a, b) => a.productID - b.productID);


            await Promise.all(cartItems.map(async (item) => {
                const product = await Product.findByPk(item.productID, { transaction: t });

                if (product) {
                    const updatedAvailable = product.available - item.quantity;

                    // Ensure available quantity is not less than 0
                    const newAvailable = Math.max(updatedAvailable, 0);

                    if (updatedAvailable < 0) {
                        throw new ApplicationError(`Quantity (${item.quantity}) exceeds available stock for product ${item.productID}`, 400);
                    }

                    await Product.update(
                        {
                            available: newAvailable,
                        },
                        {
                            where: { id: item.productID },
                            transaction: t,
                        }
                    );
                }
            }));
            await CartItemModel.destroy({ where: { userID }, transaction: t });

            await t.commit();
            return { success: true, msg: 'order place successful', res: newOrder };
        } catch (err) {
            await t.rollback();
            if (err instanceof ApplicationError) {
                throw new ApplicationError(err.message, err.code);
            } else {
                throw new ApplicationError('Something went wrong in Order Collection', 500);
            }

        }
    }
}
