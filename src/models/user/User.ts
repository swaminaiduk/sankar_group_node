import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../plugins';

export type UserModel = mongoose.Document & {
    username: string,
    profile_pic_url: string,
    phone_number: number,
    mpin: string,
    verified: boolean,
    otp: number,
    otp_expiry_time: Date,
    yes_bank_status: boolean,
    yes_bank_card_create: boolean,
    yes_bank_card_details: boolean,
    account_blocked: boolean,
    account_blocked_reason: string,
    virtual_account: string,
    vpn: string,
    balance: number,
    points: number,
    qr_code: string,
    created_at: Date,
    updated_at: Date,
    paginate(filter, options)
}

const userSchema: mongoose.Schema = new mongoose.Schema({
    username: { type: String, required: true },
    profile_pic_url: { type: String, required: false },
    phone_number: { type: Number, required: true, minlength: 10, maxlength: 10 },
    mpin: { type: String, required: false, default: null },
    verified: { type: Boolean, required: true, default: false },
    otp: { type: Number, required: true, default: null },
    otp_expiry_time: { type: Date, required: true, default: Date.now },
    yes_bank_status: { type: Boolean, required: true, default: false },
    yes_bank_card_create: { type: Boolean, required: true, default: false },
    yes_bank_card_details: { type: Boolean, required: true, default: false },
    account_blocked: { type: Boolean, required: true, default: false },
    account_blocked_reason: { type: String, required: false },
    virtual_account: { type: String, required: true },
    vpn: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
    points: { type: Number, required: true, default: 0 },
    qr_code: { type: String, required: false },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});

userSchema.plugin(toJSON);

userSchema.plugin(paginate);

export default model('users', userSchema);