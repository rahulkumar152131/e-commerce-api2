
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";


export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }
    signUp = async (req, res, next) => {
        try {
            // console.log(req.body);
            const { name, email, password } = req.body;
            // console.log(req.body);
            const hashPassword = await bcrypt.hash(password, 12);
            const newUser = new UserModel(name, email, hashPassword);
            const response = await this.userRepository.signUp(newUser);
            if (response.success) {
                return res.status(201).send(response);
            } else {
                return res.status(400).send(response);
            }
        } catch (error) {
            next(error)
        }
    }

    signIn = async (req, res) => {
        try {
            const { email, password } = req.body;
            //1.find user by email
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return res.status(400).send({ success: false, msg: 'Incorrect Credentials' });
            } else {
                // 2.compate password to hashed password
                console.log(user);

                const result = await bcrypt.compare(password, user.password);
                if (result) {

                    //3.Create token.
                    const token = jwt.sign(
                        { userID: user.id, email: user.email, userName: user.userName },
                        process.env.JWT_SECRET,
                        { expiresIn: '30d' });

                    const loginUser = {
                        userID: user._id,
                        userName: user.userName,
                        email: user.email,
                        profileImage: user.profileImage,
                        type: user.type
                    }

                    res.status(200).json({ success: true, msg: 'Login Successful', token, user: loginUser });
                } else {
                    return res.status(400).send({ success: false, msg: 'Incorrect Credentials' });
                }

            }
        } catch (err) {
            console.log("error in signin controller", err);
            res.status(500).send("Something went wrong");
        }

    }

    
}