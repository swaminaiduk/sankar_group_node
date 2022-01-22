import * as mongoose from 'mongoose';
import { model } from 'mongoose';
import { paginate, toJSON } from '../plugins';
import { Task } from '../task'
import { TaskModel } from '../task/Task';
export type TaskChatModel = mongoose.Document & {
    task_id: TaskModel,
    employee_id: string,
    description: string,
    paginate(filter, options)
}
const taskChatSchema: mongoose.Schema = new mongoose.Schema(
    { 
        task_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Task,
            required: true
        },
        employee_id: {type: String, required: true},
        description: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);
taskChatSchema.plugin(toJSON);
taskChatSchema.plugin(paginate);
export default model<TaskChatModel>('task_chat', taskChatSchema);