import { Document as MDocument } from 'mongoose';
export default interface Document extends MDocument {
    newsletter_type: string,
    email: Boolean,
    sms: Boolean,
    subject: string,
    schedule: string,
    message: string,
    status: boolean,
};
