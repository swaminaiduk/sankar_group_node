import { checkSchema } from 'express-validator';

export default checkSchema({
    position: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    },
    status: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    },
});