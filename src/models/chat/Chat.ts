import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../plugins';
import { Staff, StaffDocument } from '../staff';
export type ChatModel = mongoose.Document & {
    group_id: string,
    sender_name: string,
    senderId: StaffDocument,
    message: string,
    file: string,
    status: boolean,
    paginate(filter, options)
}
const chatSchema: mongoose.Schema = new mongoose.Schema(
    {
        group_id: {
            type: String,
            required: true,
        },
        senderId: {
            type: String, //mongoose.Schema.Types.ObjectId,
            ref: Staff,
            required: true,
        },
        sender_name: {
            type: String, //mongoose.Schema.Types.ObjectId,
            required: true,
        },
        message: {
            type: String,
            required: false,
        },
        file: {
            type: String,
            default: ''
        },
        status: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);
export default model<ChatModel>('chat', chatSchema);