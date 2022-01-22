import { Notification } from "../models/notification";
import { BaseRepositorie } from "./BaseRepositorie";
import UserDetails from '../models/UserDetails';
import config from '../config/app'
class NotificationRepositorie extends BaseRepositorie {
    constructor() {
        super(Notification);
    }

    public getUpcomingSchedule = async () => {
        let mysort = { schedule: 'asc' };
        let now = new Date();
        return await this.model.findOne({status: true, schedule :{$lte : now } }).limit(1).sort(mysort)
    }
    public sendNotification = async()=>{
        let mysort = { schedule: 'asc' };
        let now = new Date();
        const ScheduleNotification = await this.model.findOne({schedule :{$lte : now }, status:true }).limit(1).sort(mysort)
        const userList = await UserDetails.find({}).limit(2)
        // console.log(userList[0].email) // @issue is here
        const user_mobile_nos = ['7989138989']
         
        if(ScheduleNotification && ScheduleNotification._id){
            await this.model.updateOne({ _id: ScheduleNotification._id }, {status: false });
        }
        return
    }
}

export default new NotificationRepositorie();