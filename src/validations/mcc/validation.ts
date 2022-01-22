import { checkSchema } from 'express-validator';
import { MccRepositorie } from '../../repositories';

export default checkSchema({
    code: {
        notEmpty: { errorMessage: "The code field must be required." },
        custom: {
            options: async (code, { req }) => {
                return await MccRepositorie.findByCode(code).then(mcc => {
                    if ((req.method === 'POST' && mcc) || (req.method === 'PATCH' && mcc && req.mcc.code !== code)) {
                        throw new Error('This code is already exists.');
                    } else {
                        return true;
                    }
                });
            },
        },
        trim: true,
    },
    type: {
        notEmpty: { errorMessage: "The type field must be required." },
        trim: true,
    },
    status: {
        notEmpty: { errorMessage: "The status field must be required." },
        trim: true,
    },
});