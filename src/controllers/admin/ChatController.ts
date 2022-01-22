import { Request, Response } from 'express';
import { ChatRepositorie as Chat} from '../../repositories';
import { catchAsync, pick, successResponse } from '../../utils';

export default class MccController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Chat.getChat(req.params._id);
        var chats = [];
        chats.push({'chat':data, userId: 123, id: 123})
        return successResponse(res, 'Chat list1.', chats);
    });
    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        await Chat.create(pick(req.body, ['group_id', 'sender_name', 'senderId','message']));
        const data:any = await Chat.getChat(req.body.group_id);
        return successResponse(res, 'Chat list.', data);
    });
}