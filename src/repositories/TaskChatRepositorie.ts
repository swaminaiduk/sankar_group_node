import { TaskChat } from "../models/task";
import { BaseRepositorie } from "./BaseRepositorie";
class TaskChatRepositorie extends BaseRepositorie {
    constructor() {
        super(TaskChat);
    } 
    public taskCount = async () => {
        return await this.model.count()
    }
    public getTaskComments = async (taskId) => {
        return await this.model.find({task_id: taskId}).sort({createdAt: 'desc'})
    }
}
export default new TaskChatRepositorie();