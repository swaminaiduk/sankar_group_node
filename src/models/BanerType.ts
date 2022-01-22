import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from './plugins';

const BanerTypeSchema = new mongoose.Schema(
    {
        position: { type: String, required: true },
        status: {
            type: Boolean,
            required: true,
            default: false,
        },
        images: {
            type: Array,
            default: [],
        }
    },
    {
        timestamps: true,
    }
);

BanerTypeSchema.plugin(toJSON);

BanerTypeSchema.plugin(paginate);

export default model('baner_types', BanerTypeSchema);