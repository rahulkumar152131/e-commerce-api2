import { Op } from 'sequelize';
import CartItemModel from './cartItem.schema.js';
import Product from '../product/product.schema.js';

export default class CartItemRepository {
    async add(productID, userID, quantity) {
        try {
            const isAlreadyInCart = await CartItemModel.findOne({
                where: {
                    productID,
                    userID,
                },
            });

            if (isAlreadyInCart) {
                return { success: false, msg: 'Already in Cart' };
            }

            const newItem = await CartItemModel.create({
                productID,
                userID,
                quantity,
            });

            return { success: true, msg: 'Successfully added', res: newItem.toJSON() };
        } catch (err) {
            console.error(err);
            return { success: false, msg: 'Error in cartsItem Collection' };
        }
    }

    async getAllCartItem(userID) {
        try {
            const items = await CartItemModel.findAll({
                where: { userID },
                include: [{
                    model: Product,
                    as: 'products',
                }],
            });

            return { success: true, msg: 'Carts getting successful', res: items };
        } catch (err) {
            throw new ApplicationError('Something went wrong in Carts Collection', 500);

        }
    }

    async increaseCartItemQuantity(cartItemID, userID) {
        try {

            const updatedItem = await CartItemModel.increment('quantity', {
                where: { id: cartItemID, userID },
                returning: true,
            });
            // console.log(updatedItem.length);
            if (updatedItem[0][0].length > 0) {
                return { success: true, msg: 'cart item incresed by 1', res: updatedItem[0][0] };
            } else {
                return { success: false, msg: 'Item not found' };
            }
            return updatedItem[0][0];
        } catch (err) {
            throw new ApplicationError('Something went wrong in Carts Collection', 500);

        }
    }

    async decreaseCartItemQuantity(cartItemID, userID) {
        try {
            const updatedItem = await CartItemModel.decrement('quantity', {
                where: {
                    id: cartItemID,
                    userID,
                    quantity: { [Op.gt]: 1 },
                },
                returning: true,
            });
            // console.log(updatedItem);

            if (updatedItem[0][0].length > 0) {
                return { success: true, msg: 'cart item decrease by 1', res: updatedItem[0][0] };
            } else {
                return { success: false, msg: 'Item not found' };
            }
        } catch (err) {
            throw new ApplicationError('Something went wrong in Carts Collection', 500);

        }
    }

    async deleteCartItem(cartItemID, userID) {
        try {
            const deletedItem = await CartItemModel.destroy({
                where: { id: cartItemID, userID },
            });
            console.log(deletedItem);
            if (deletedItem > 0) {
                return { success: true, msg: 'Deleted Succesful' };
            } else {
                return { success: false, msg: 'Item not found' };
            }

        } catch (err) {
            throw new ApplicationError('Something went wrong in Carts Collection', 500);
        }
    }
}