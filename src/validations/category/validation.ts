import { checkSchema } from 'express-validator';
import { Company } from '../../repositories';

export default checkSchema({
    name: {
        notEmpty: { errorMessage: "The name field must be required." },
        custom: {
             
        },
        trim: true,
    },
    status: {
        notEmpty: { errorMessage: "The status field must be required." },
        trim: true,
    },
});