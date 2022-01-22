import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from './plugins';

const reportsSchema = new mongoose.Schema(
    {
        file_name: { type: String, required: true },
        type: { type: String, required: true },
        start_date: { type: Date, required: false },
        end_date: { type: Date, required: false },
    },
    {
        timestamps: true,
    }
);

reportsSchema.plugin(toJSON);

reportsSchema.plugin(paginate);

export default model('reports', reportsSchema);