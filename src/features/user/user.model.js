import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModel {
    constructor(name, email, password) {
        this.userName = name;
        this.email = email;
        this.password = password;
    }
}
