import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../plugins';
import { RewardDocument } from './index';

export type RewardModel  = mongoose.Document & {
    reward_id: string,
    reward_type: string,
    point: number,
    point_type: boolean,
    status: boolean,
    paginate(filter, options)
}

const rewardSchema: mongoose.Schema = new mongoose.Schema(
    {
        reward_id: {
            type: String,
            required: true,
            unique: true,
        },
        reward_type: {
            type: String,
            required: true,
        },
        point: {
            type: Number,
            required: true,
        },
        point_type: {
            type: Boolean,
            required: true,
            default: false, // true = fix and false = %
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

rewardSchema.plugin(toJSON);

rewardSchema.plugin(paginate);

export default model<RewardModel>('rewards', rewardSchema);