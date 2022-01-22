import { User } from "../models/user";
import { BaseRepositorie } from "./BaseRepositorie";

class UserRepositorie extends BaseRepositorie {
    constructor() {
        super(User);
    }
    public getUserList = async () => {
        return await this.model.find({}) 
    }
    public getUserDetailList = async () => {
        return await this.model.find()
    }
}

export default new UserRepositorie();
