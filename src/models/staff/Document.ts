import { Document as MDocument } from 'mongoose';
export default interface Document extends MDocument {
    name: string,
    email: string,
    mobile: string,
    department: string,
    designation: string,
    status: boolean,
    company: array,
    personal_email: string,
    personal_mobile: number,
    logo: string,
    password: string
};
