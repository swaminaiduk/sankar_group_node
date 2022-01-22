import { Document } from 'mongoose';
import { StaffDocument } from '../staff';

export default interface ChatDocument extends Document {
    group: String,
    sender_name :  String,
    senderId :  StaffDocument,
    message :  String,
    status: boolean,
};