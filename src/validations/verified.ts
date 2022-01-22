import { checkSchema } from 'express-validator';

export default checkSchema({
    verified: {
        notEmpty: { errorMessage: "The status field must be required." },
        trim: true,
    },
});