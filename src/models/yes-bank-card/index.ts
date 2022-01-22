import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../plugins';
import { Service } from '../service';

const YesBankCardSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Types.ObjectId, required: true },
        cardHashId: { type: String, required: true },
        expiryDate: { type: String, required: false },
        cvv: { type: String, required: false },
        type: { type: String, required: false },
        cardNumber: { type: String, required: false },
        monthly_limit: { type: String, required: true, default: "0" },
        usage: { type: String, required: true, default: "0" },
        temp_block: { type: Boolean, required: true, default: false },
        offline: { type: Boolean, required: true, default: true },
        online: { type: Boolean, required: true, default: false },
        atm: { type: Boolean, required: true, default: true },
    }
);

YesBankCardSchema.plugin(toJSON);

YesBankCardSchema.plugin(paginate);

export default model('yes_bank_card', YesBankCardSchema);