import { Request, Response } from 'express';
import { catchAsync, pick, successResponse } from '../../utils';
import { MediaRepositorie as Media} from '../../repositories';
export default class ImageController {
    public upload = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = {
            title: req.body.title,
            description: req.body.description,
            user_id: req.body.user_id,
            media: req.file?.filename,
            status: true
        }
        const result = await Media.create(data);
        return successResponse(res, 'Image successfully uploaded.', req.body.user_id);
    });
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Media.query({},{});
        return successResponse(res, 'Files & Media list.', data);
    });
    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        await Media.deleteById(id);
        return successResponse(res, 'Media has been successfully deleted.', null);
    }); 
}