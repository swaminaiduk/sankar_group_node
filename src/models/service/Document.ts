import { Document as MDocument } from 'mongoose';
import { CategoryDocument } from '../company';

export default interface Document extends MDocument {
    icon: string,
    name: string,
    brand: string,
    product: string,
    points: string,
    points_type: boolean,
    status: boolean,
};
