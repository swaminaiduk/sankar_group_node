import { Document } from 'mongoose';

export default interface CompanyDocument extends Document {
    company: string,
    city: string,
    branch: string,
    status: boolean,
};
