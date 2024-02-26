import "./env.js"

import express from "express";
import swagger from "swagger-ui-express";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.router.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import cartItemRouter from "./src/features/cartItem/cartItem.routes.js";
import apiDocs from './swagger3.0.json' assert{type: 'json'};
import { ApplicationError } from "./src/error-handler/applicationError.js";
import orderRouter from "./src/features/order/order.router.js";
import { connectUsingSequelize } from "./src/config/postgresDB.js";
import callAssociations from "./src/config/association.js";
// const {bodyParser}=pkg;

const server = express();

//load all the environment variable in the application

server.use(cors({
    origin: 'http://localhost:8000',
}));



server.use('/uploads', express.static('uploads'))
server.use(cookieParser());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));

connectUsingSequelize();

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
// for all requrests related to product, redirect to product routes.
server.use("/api/products", productRouter);
server.use("/api/users", userRouter);
server.use('/api/carts', jwtAuth, cartItemRouter);
server.use('/api/orders', jwtAuth, orderRouter);

server.get('/', (req, res) => {
    res.send('Hello world');
})

//Error handler middleware
server.use((err, req, res, next) => {
    // console.log(err);
    if (err instanceof ApplicationError) {
        // console.log('***', err, '***');
        return res.status(err.code).send({ succes: false, msg: err.message })
    }
    res.status(500).send({ succes: false, msg: 'Something went wrong, please try later' });
})

//middleware to handle 404 requests.
server.use((req, res) => {
    res.status(404).send("API not found");
})


server.listen(4100, async () => {

    callAssociations();
    console.log('server is listening on port : 4100');
})