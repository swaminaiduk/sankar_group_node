import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../plugins';

export type GroupModel = mongoose.Document & {
    group: string,
    group_id: string,
    company: string,
    brand: string,
    employee_name: string,
    employee_id: string,
    status: boolean,
    paginate(filter, options)
}
const groupSchema: mongoose.Schema = new mongoose.Schema(
    { 
        group: {
            type: String,
            required: true,
        },
        group_id: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: false,
        },
        brand: {
            type: String,
            required: true,
        },
        employee_name: {
            type: String,
            required: false,
        },
        employee_id: {
            type: String,
            required: false,
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
groupSchema.plugin(toJSON);
groupSchema.plugin(paginate);
export default model<GroupModel>('group', groupSchema);