import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { Category, CategoryDocument } from './index';
import { paginate, toJSON } from '../../plugins';

export type CategoryModel = mongoose.Document & {
    category_id: string,
    title: string,
    parent_category: string,
    status: boolean,
    paginate(filter, options)
}

const categorySchema: mongoose.Schema = new mongoose.Schema(
    {
        category_id: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        parent_category: {
            type: String,
            required: false,
            default: "Main",
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

categorySchema.index({ name: 1 }, { unique: true })

categorySchema.plugin(toJSON);

categorySchema.plugin(paginate);

export default model<CategoryModel>('market_place_categories', categorySchema);