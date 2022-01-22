import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../plugins';

export type ServiceModel = mongoose.Document & {
    name: string,
    username: string,
    password: string,
    key: string,
    salt: string,
    token: string,
    status: boolean,
    paginate(filter, options)
}

const serviceSchema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        key: {
            type: String,
        },
        salt: {
            type: String,
        },
        token: {
            type: String,
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

serviceSchema.plugin(toJSON);

serviceSchema.plugin(paginate);

export default model<ServiceModel>('services', serviceSchema);