import { Request, Response } from 'express';
import { catchAsync, successResponse } from '../../utils';
import { ChatRepositorie as Chat} from '../../repositories';
export default class ImageController {
    public upload = catchAsync(async (req: Request, res: Response): Promise<any> => {
        console.log(req.body.sender_name)
        await Chat.create({
            group_id: req.body.group_id,
            sender_name: req.body.sender_name,
            senderId: req.body.senderId,
            file: req.file.filename,
            msg: req.body.msg
        });
        return successResponse(res, 'Image successfully uploaded.', {
            name: req.file.filename
        });
    });
}