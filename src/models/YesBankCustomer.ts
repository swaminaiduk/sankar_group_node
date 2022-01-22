import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { User } from './user';
import { paginate, toJSON } from './plugins';

const YesBankCustomerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: User },
    customerHashId: { type: String, required: true },
    otpReferenceNumber: { type: String, required: true },
    token: { type: String, required: false },
    code: { type: String, required: true },
    kyc_type: { type: String, required: false, default: null },
    monthly_limit: { type: String, required: true, default: 0 },
    message: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});

YesBankCustomerSchema.plugin(toJSON);

YesBankCustomerSchema.plugin(paginate);

export default model('yes_bank_customers', YesBankCustomerSchema);