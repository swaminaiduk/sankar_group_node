import { Document } from 'mongoose';

export default interface CategoryDocument extends Document {
    category_id: string,
    title: string,
    parent_category: string,
    status: boolean,
};
