import { Request, Response, Router } from 'express';
import { NotificationRepositorie as Notification, UserRepositorie} from '../../repositories';
import { catchAsync, pick, successResponse } from './../../utils';
import config from '../../config/app'
import UserDetails from '../../models/UserDetails';

var cron = require('cron');

export default class NotificationController {
    public index = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const filter = pick(req.query, []);
        const options = pick(req.query, ['limit', 'page']);
        const data = await Notification.query(filter, options);
        return successResponse(res, 'Notification list.', { ...data, image_path: `${config.BASE_URL}/${config.IMAGE_PATH}/` });
    });

    public findById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        const data = await Notification.findById(id);
        return successResponse(res, 'Notification data.', data);
    });

    public create = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const data = await Notification.create(pick(req.body, [ 
            'newsletter_type', 'email', 'sms','mobile', 'subject', 'schedule', 'message', 'status'
        ]));
        return successResponse(res, 'Notification data has been successfully created.', data);
    });
    
    public deleteById = catchAsync(async (req: Request, res: Response): Promise<any> => {
        const id = pick(req.params, ['_id']);
        await Notification.deleteById(id);
        return successResponse(res, 'Notification data has been successfully deleted.', null);
    }); 
    // get all users
    public users = catchAsync(async (req: Request, res: Response): Promise<any> => {
        // get the notification
        const ScheduleNotification = await Notification.getUpcomingSchedule();
        // get all users
        // const userList = await UserRepositorie.getUserList();
        const userList = await UserDetails.find()
        // console.log(userList)
        // check sms is there or not
        const user_mobile_nos = []
        if(ScheduleNotification.sms){
            userList.forEach(async user  => {
                // console.log(user?.mobile_number)
                // user_mobile_nos.push(user.mobile_number)
            });
            
        }
        
        // update to false
        // await Notification.updateById({ _id: ScheduleNotification._id }, {status: false });
        return successResponse(res, 'upcoming notification', userList);
    });
    public cronJob = cron.job("0 * * * * *", function(){
        Notification.sendNotification();
    }).start(); 
  }