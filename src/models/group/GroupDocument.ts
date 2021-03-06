import { Document as MDocument } from 'mongoose';
export default interface GroupDocument extends MDocument {
    group: string,
    company: string,
    company_name: string,
    brand: string,
    employee_name: string,
    employee_id: string,
    logo: string,
    status: boolean,
};
