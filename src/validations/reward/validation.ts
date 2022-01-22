import { checkSchema } from 'express-validator';
import { Reward } from '../../repositories';

export default checkSchema({
    reward_type: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    },
    point: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    },
    point_type: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    },
    status: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    },
});