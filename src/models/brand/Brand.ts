import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../plugins';

export type BrandModel = mongoose.Document & {
    brand: string,
    status: boolean,
    paginate(filter, options)
}

const brandSchema: mongoose.Schema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

brandSchema.plugin(toJSON);

brandSchema.plugin(paginate);

export default model<BrandModel>('brand', brandSchema);