import { checkSchema } from 'express-validator';

export default checkSchema({
    message: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    },
    schedule: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    }
});