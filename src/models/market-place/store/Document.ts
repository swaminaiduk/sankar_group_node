import { Document } from 'mongoose';
import { CategoryDocument } from '../category';

export default interface StoreDocument extends Document {
    store_type: string,
    icon: string,
    logo: string,
    store_id: string,
    store_name: string,
    sub_title: string,
    offer: string,
    category: CategoryDocument,
    sub_category: CategoryDocument,
    status: boolean,
};
