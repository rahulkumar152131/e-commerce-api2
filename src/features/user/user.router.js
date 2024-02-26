import express from "express";
import UserController from "./user.controller.js";
import { signUpFormValidate } from "../../middleware/expressValidator.js";
const userRouter = express.Router();
const userController = new UserController();
userRouter.post('/sign-up', signUpFormValidate, userController.signUp);
userRouter.post('/sign-in', userController.signIn);

export default userRouter;
