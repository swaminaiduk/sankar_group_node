import { Document } from 'mongoose';
// import { BandDocument } from '../brand';

export default interface BrandDocument extends Document {
    brand: string,
    logo: string,
    status: boolean,
};
