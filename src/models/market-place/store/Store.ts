import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../../plugins';
import { Category } from '../category';
import { CategoryModel } from '../category/Category';
import StoreDocument from './Document';

export type StoreModel  = mongoose.Document & {
    store_type: string,
    icon: string,
    logo: string,
    store_id: string,
    store_name: string,
    sub_title: string,
    offer: string,
    category: CategoryModel,
    sub_category: CategoryModel,
    status: boolean,
    paginate(filter, options)
}

const storeSchema: mongoose.Schema = new mongoose.Schema(
    {
        store_type: {
            type: Boolean,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        store_id: {
            type: String,
            required: true,
        },
        store_name: {
            type: String,
            required: true,
        },
        sub_title: {
            type: String,
            required: true,
        },
        offer: {
            type: String,
            required: true,
        },
        availOffer: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Category,
            required: true,
        },
        sub_category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Category,
            required: true,
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

storeSchema.plugin(toJSON);

storeSchema.plugin(paginate);

export default model<StoreModel>('market_place_stores', storeSchema);