import { Task } from "../models/task";
import { BaseRepositorie } from "./BaseRepositorie";
class TaskRepositorie extends BaseRepositorie {
    constructor() {
        super(Task);
    }  
    public getTasks = async (whereCond) =>{
        const taskList = await Task.find({ isCompleted: whereCond }).exec();
        return taskList.map((t) => {
            return {
                id: t._id,
                dueDate: t.dueDate,
                title: t.title,
                tags: t.priority,
                isCompleted: t.isCompleted,
                isImportant: t.isImportant,
                assignee: t.assignee,
                // assignee: {'fullName':'swami'},
            };
        })
    }
    public getTasksCount = async () =>{
        return await this.model.count()
    }
    public getCompletedTasksCount = async () =>{
        return await this.model.count({isCompleted: true})
    }
    public getPendingTasksCount = async () =>{
        return await this.model.count({isCompleted: false})
    }
}

export default new TaskRepositorie();