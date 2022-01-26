import { Request, Response } from 'express';
import { StaffRepositorie, TaskRepositorie as Task, TaskChatRepositorie as TaskChat} from '../../repositories';
import { catchAsync, pick, successResponse } from '../../utils';
export default class GiftcardController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const filter = pick(req.query, []);
        const options = pick(req.query, ['limit', 'page']);
        const whereCond = ( req.query.filter === 'completed' ) ? true : false
        const emp_id = req.query.emp_id
        const tasks = await Task.getTasks(whereCond, emp_id)
        return successResponse(res, 'Task list.', tasks);
    });
    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const reqData = req.body
        const taskRes = await Task.create({
            assignee: reqData.assignee,
            title:  reqData.title,
            group:  reqData.group,
            dueDate:  reqData.dueDate,
            isCompleted:  reqData.isCompleted,
            isImportant:  reqData.isImportant,
            priority:  reqData.tags,
        });
        await TaskChat.create({
            task_id:  taskRes._id,
            employee_id:  reqData.employee_id,
            description:  reqData.description,
        })
        return successResponse(res, 'Chat list.', taskRes);
    });
    public getTaskComments = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const status = await Task.getTaskStatus(req.params._taskId)
        const comments = await TaskChat.getTaskComments(req.params._taskId)
        var taskComments = [];
        comments.map(async function(r){
            const staff: any = await StaffRepositorie.getEmpName(r.employee_id);
            r.employee_id= staff.name
            taskComments.push(r)
        })
        return successResponse(res, 'Task Conversation', [...comments]);
    });

    public newComment = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const reqData = req.body
        await TaskChat.create({
            task_id:  reqData.task_id,
            employee_id:  reqData.employee_id,
            description:  reqData.description,
        })
        return successResponse(res, 'Comment posted');
    });

    public updateTask = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const reqData = req.body
        const updateStatus = (reqData.status === true || reqData.isCompleted === true) ?  false : true
        console.log(reqData.status+'----'+updateStatus)
        const result = await Task.updateById({_id:  reqData.task_id}, {isCompleted: updateStatus})
        return successResponse(res, 'Status updated', result);
    });
}   