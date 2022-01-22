import { Document as MDocument } from 'mongoose';
export default interface Document extends MDocument {
    giftcard_category_id: string,
    giftcard_category_sku: Boolean,
    giftcard_category_name: Boolean,
    icon: string,
    status: boolean,
};
