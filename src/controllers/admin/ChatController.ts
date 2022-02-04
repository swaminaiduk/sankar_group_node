import { Request, Response } from 'express';
import { ChatRepositorie as Chat, TaskRepositorie as Task} from '../../repositories';
import { catchAsync, pick, successResponse } from '../../utils';

export default class MccController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Chat.getChat(req.params._id);
        var chats = [];
        const completedTasks = await Task.groupCompletedTasks(req.params._id);
        const pendingTasks = await Task.groupPendingTasks(req.params._id);
        chats.push({'chat':data, userId: 123, id: 123, completedTasksCount: completedTasks, pendingTasksCount: pendingTasks})
        return successResponse(res, 'Chat list1.', chats);
    });
    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        await Chat.create(pick(req.body, ['group_id', 'sender_name', 'senderId','message']));
        const data:any = await Chat.getChat(req.body.group_id);
        return successResponse(res, 'Chat list.', req.body.group_id );
    });
    public groupMedia = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Chat.getMedia(req.params. group_id);
        return successResponse(res, 'Group Media list.', data);
    }); 
}