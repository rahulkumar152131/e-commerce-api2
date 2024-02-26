
import { ApplicationError } from "../../error-handler/applicationError.js"
import Category from "../product/category.schema.js";
import User from "./user.schema.js";

export default class UserRepository {
    async signUp(user) {
        try {
            const alreadyUser = await User.findOne({
                where: { email: user.email }
            });
            if (alreadyUser) {
                return { success: false, msg: "Already Registered" };
            }

            const newUser = await User.create(user);
            const { password, ...userWithoutPassword } = newUser.toJSON();
            return { success: true, msg: "Registration Successful", res: userWithoutPassword };
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Error in registration", 400);
        }
    }

    async findByEmail(email) {
        try {
            const user = await User.findOne({
                where: { email: email }
            });
            // console.log(user, 'user')
            return user;
        } catch (err) {
            console.log("Error in sign-in", err);
            throw new ApplicationError('Something went wrong with the database', 500);
        }
    }

}