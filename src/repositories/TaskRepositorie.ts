import { Task } from "../models/task";
import { GroupRepositorie as Group } from '../repositories';
import { BaseRepositorie } from "./BaseRepositorie";
class TaskRepositorie extends BaseRepositorie {
    constructor() {
        super(Task);
    }  
    public getTasks = async (whereCond, emp_id) =>{
        const taskList = await Task.find({ ...whereCond,  assignee: { $in: [emp_id]} }).exec();
        return await Promise.all(taskList.map(async (t) => {
            const groupName:any = await Group.getName(t.group);
            const companyName:any = await Group.getCompanyName(t.group);
            return {
                id: t._id,
                dueDate: t.dueDate,
                title: t.title,
                tags: t.priority,
                isCompleted: t.isCompleted,
                isImportant: t.isImportant,
                assignee: t.assignee,
                groupId: groupName,
                company_name: companyName
            };
        }))
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
    public groupCompletedTasks = async (groupId) =>{
        return await this.model.count({isCompleted: true, group: groupId})
    }
    public groupPendingTasks = async (groupId) =>{
        return await this.model.count({isCompleted: false, group: groupId})
    }
}

export default new TaskRepositorie();