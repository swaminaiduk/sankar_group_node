import { Document } from 'mongoose';

export default interface MccDocument extends Document {
    reward_id: string,
    reward_type: string,
    point: number,
    point_type: boolean,
    status: boolean,
};
