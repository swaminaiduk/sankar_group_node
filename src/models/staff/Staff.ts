import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../plugins';
import { Company, CompanyDocument } from '../company';
export type StaffModel = mongoose.Document & {
    name: string,
    mobile: string,
    email: string,
    mpin: string,
    role: string,
    designation: string,
    personal_email: string,
    personal_mobile: number,
    passowrd: string,
    status: boolean,
    paginate(filter, options)
}

const staffSchema: mongoose.Schema = new mongoose.Schema(
    { 
        company: {type: Array},
        brand: {type: Array},
        personal_email: {type: String},
        personal_mobile: {type: Number},
        passowrd: {type: String},
        logo: {type: String},
        company1: {type: String,required: true, ref: Company,},
        company2: {type: String,required: false, ref: Company,},
        company3: {type: String,required: false, ref: Company,},
        company4: {type: String,required: false, ref: Company,},
        company5: {type: String,required: false, ref: Company,},
        brand1: {type: String,required: true,},
        brand2: {type: String,required: false,},
        brand3: {type: String,required: false,},
        brand4: {type: String,required: false,},
        brand5: {type: String,required: false,},
        role: {type: String,required: true,},
        designation: {type: String,required: true,},
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        mpin: {
            type: Number,
            default: '2020',
            required: true,
        },
        mobile: {
            type: Number,
            required: false,
            unique: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: true,
        } ,
        department: {
            type: String,
        } 
    },
    {
        timestamps: true,
    }
);
staffSchema.plugin(toJSON);
staffSchema.plugin(paginate);
export default model<StaffModel>('staff', staffSchema);