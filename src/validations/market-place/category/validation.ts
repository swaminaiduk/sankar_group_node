import { checkSchema } from 'express-validator';

export default checkSchema({
    title: {
        notEmpty: { errorMessage: "The name field must be required." },
        trim: true,
    },
    parent_category: {
        notEmpty: { errorMessage: "The name field must be required." },
        trim: true,
    },
    status: {
        notEmpty: { errorMessage: "The status field must be required." },
        trim: true,
    },
});