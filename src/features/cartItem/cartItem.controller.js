import CartItemRepository from './cartItem.repository.js';

export default class CartItemController {
    constructor() {
        this.cartItemRepository = new CartItemRepository();
    }
    add = async (req, res) => {
        try {
            const { productID, quantity } = req.query;
            const userID = req.userID;
            const response = await this.cartItemRepository.add(productID, userID, parseInt(quantity));
            return res.status(201).send(response);

        } catch (err) {
            // console.log("Something went wrong in adding cart item", err);
            res.status(400).send('Something went wrong')
        }
    }
    get = async (req, res) => {

        try {
            const userID = req.userID;
            const response = await this.cartItemRepository.getAllCartItem(userID);
            res.status(200).send(response);
        } catch (err) {
            // console.log("Something went wrong in getting cart item", err);
            res.status(400).send('Something went wrong')
        }

    }

    increaseQuantity = async (req, res) => {
        try {
            const userID = req.userID;
            const productID = req.params.id;
            const response = await this.cartItemRepository.increaseCartItemQuantity(productID, userID);
            // console.log(item);
            if (response.success) {
                return res.status(200).send(response);
            } else {
                return res.status(404).send(response);
            }
        } catch (err) {
            res.status(400).send('Something went wrong')
        }
    }
    decreaseQuantity = async (req, res) => {
        try {
            const userID = req.userID;
            const productID = req.params.id;
            // console.log(productID);
            const response = await this.cartItemRepository.decreaseCartItemQuantity(productID, userID);
            if (response.success) {
                return res.status(200).send(response);
            } else {
                return res.status(404).send(response);
            }
        } catch (err) {
            // console.log("Something went wrong in getting cart item", err);
            res.status(400).send('Something went wrong')
        }
    }
    deleteCartItem = async (req, res) => {
        try {
            const userID = req.userID;
            const productID = req.params.id;
            // console.log(productID);
            const response = await this.cartItemRepository.deleteCartItem(productID, userID);
            // console.log(item, 'item');
            if (response.success) {
                return res.status(200).send(response);
            } else {
                return res.status(404).send(response);

            }

        } catch (err) {
            // console.log("Something went wrong in getting cart item", err);
            res.status(400).send('Something went wrong')
        }
    }




}