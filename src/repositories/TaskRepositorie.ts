import { Task } from "../models/task";
import task from "../routes/admin/task";
import { BaseRepositorie } from "./BaseRepositorie";
class TaskRepositorie extends BaseRepositorie {
    constructor() {
        super(Task);
    }  
    public getTasks = async (whereCond, emp_id) =>{
        const taskList = await Task.find({ isCompleted: whereCond,  assignee: { $in: [emp_id]} }).exec();
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
    
    public getTaskStatus = async (taskId) =>{
        return await this.model.findOne({isCompleted: true, _id:taskId}).select('isCompleted').exec()
    }
    public getCompletedTasksCount = async () =>{
        return await this.model.count({isCompleted: true})
    }
    public getPendingTasksCount = async () =>{
        return await this.model.count({isCompleted: false})
    }
}

export default new TaskRepositorie();