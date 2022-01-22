import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../plugins';
export type TaskModel = mongoose.Document & {
    title: string,
    assignee: object,
    priority: object,
    isImportant: boolean,
    isCompleted: boolean,
    group: string,
    dueDate: string,
    paginate(filter, options)
}
const taskSchema: mongoose.Schema = new mongoose.Schema(
    { 
        title: {type: String,required: true},
        assignee: {type: Object,required: true},
        priority: {type: Object,required: false},
        isImportant: {type: Boolean},
        isCompleted: {type: Boolean},
        group: {type: String,required: true},
        dueDate: { type: String},
    },
    {
        timestamps: true,
    }
);
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);
export default model<TaskModel>('task', taskSchema);