import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { CompanyDocument } from './index';
import { paginate, toJSON } from '../plugins';

export type CompanyModel = mongoose.Document & {
    company: string,
    city: string,
    branch: string,
    status: boolean,
    logo: string,
    paginate(filter, options)
}

const companySchema: mongoose.Schema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        branch: {
            type: String,
            required: true,
            trim: true
        }, 
        logo: {
            type: String,
            required: false
        },        
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);
companySchema.index({ company: 1 }, { unique: false })
companySchema.plugin(toJSON);
companySchema.plugin(paginate);
export default model<CompanyModel>('company', companySchema);