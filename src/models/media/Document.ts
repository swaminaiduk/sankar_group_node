import { Document as MDocument } from 'mongoose';
export default interface Document extends MDocument {
    title: string,
    description: string,
    media: string
};
