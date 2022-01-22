import { checkSchema } from 'express-validator';

export default checkSchema({
    status: {
        notEmpty: { errorMessage: "The status field must be required." },
        trim: true,
    },
});