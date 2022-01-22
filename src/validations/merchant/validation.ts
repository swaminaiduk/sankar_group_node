import { checkSchema } from 'express-validator';

export default checkSchema({
    merchant_id: {
        notEmpty: { errorMessage: "The merchant id field must be required." },
        trim: true,
    },
    merchant_name: {
        notEmpty: { errorMessage: "The merchant name field must be required." },
        trim: true,
    },
    mcc: {
        notEmpty: { errorMessage: "The mcc field must be required." },
        trim: true,
    },
    status: {
        notEmpty: { errorMessage: "The status field must be required." },
        trim: true,
    },
});