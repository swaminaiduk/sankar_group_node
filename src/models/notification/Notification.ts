import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../plugins';

export type NotificationModel = mongoose.Document & {
    newsletter_type: string,
    email: boolean,
    sms: boolean,
    subject: string,
    schedule: string,
    message: string,
    status: boolean,
    paginate(filter, options)
}

const notificationSchema: mongoose.Schema = new mongoose.Schema(
    { 
        newsletter_type: {
            type: String,
            required: true,
        },
        email: {
            type: Boolean,
            required: false,
        },
        sms: {
            type: Boolean,
            required: false,
        },
        subject: {
            type: String,
            required: false,
        },
        schedule: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);
notificationSchema.plugin(toJSON);
notificationSchema.plugin(paginate);
export default model<NotificationModel>('notification', notificationSchema);