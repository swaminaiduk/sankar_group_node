import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../plugins';
import { Staff, StaffDocument } from '../staff';
export type MediaModel = mongoose.Document & {
    title: string,
    description: string,
    user_id: string,
    media: string,
    status: boolean,
    paginate(filter, options)
}

const mediaSchema: mongoose.Schema = new mongoose.Schema(
    { 
        title: {
            type: String,
            required: false,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            reference: Staff
        },
        description: {
            type: String,
            required: false,
        },
        media: {
            type: String,
            required: false,
            default: null
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
mediaSchema.plugin(toJSON);
mediaSchema.plugin(paginate);
export default model<MediaModel>('media', mediaSchema);