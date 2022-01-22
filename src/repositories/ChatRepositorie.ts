import { Chat } from "../models/chat";
import { BaseRepositorie } from "./BaseRepositorie";

class ChatRepositorie extends BaseRepositorie {
    constructor() {
        super(Chat);
    } 
    public getChat = async (group_id) => {
        return await this.model.find({'group_id': group_id})
    }
}

export default new ChatRepositorie();