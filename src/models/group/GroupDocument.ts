import { Document as MDocument } from 'mongoose';
export default interface GroupDocument extends MDocument {
    group: string,
    company: string,
    brand: string,
    employee_name: string,
    employee_id: string,
    status: boolean,
};
