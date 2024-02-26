import CartItemRepository from "../cartItem/cartItem.repository.js";
import OrderModel from "./order.model.js";
import OrderRepository from "./order.repository.js";

export default class OrderController {
    constructor() {
        this.orderRepository = new OrderRepository();
        this.cartItemRepository = new CartItemRepository();
    }
    placeOrder = async (req, res, next) => {
        try {
            const userID = req.userID;
            const response = await this.orderRepository.placeOrder(userID);
            if (response.success) {
                return res.status(200).send(response);
            } else {
                return res.status(400).send(response);
            }
        } catch (err) {
            next(err)
        }
    }
    getOneOrder = async (req, res) => {
        try {
            const userID = req.userID;
            const orderID = req.params.id;
            const response = await this.orderRepository.getOneOrder(userID, orderID);
            if (response.success) {
                return res.status(200).send(response);
            } else {
                return res.status(404).send(response);
            }
            res.status(200).send(orders);
        } catch (err) {
            console.log("Error in placing order", err);
            res.status(500).send("Something went wrong")
        }
    }
    getAllorder = async (req, res) => {
        try {
            const userID = req.userID;
            const orders = await this.orderRepository.getAllOrder(userID);
            res.status(200).send(orders);
        } catch (err) {
            console.log("Error in placing order", err);
            res.status(500).send("Something went wrong")
        }
    }
}