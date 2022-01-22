import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { User } from './user';
import { paginate, toJSON } from './plugins';

const userDetailsSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: User },
    full_name: { type: String, required: true },
    mobile_number: { type: Number, required: true, minlength: 10, maxlength: 10 },
    email: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"] },
    date_of_birth: { type: Date, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    area: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    aadhaar_number: { type: String, required: false },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
});

userDetailsSchema.plugin(toJSON);

userDetailsSchema.plugin(paginate);

export default model('user_details', userDetailsSchema);