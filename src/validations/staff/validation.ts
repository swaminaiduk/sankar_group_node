import { checkSchema } from 'express-validator';

export default checkSchema({
     
    name: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    },
    mpin: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    },
    mobile: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    },
    role: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    },
    pg: {
        notEmpty: { errorMessage: "This field must be required." },
        trim: true,
    } 
});