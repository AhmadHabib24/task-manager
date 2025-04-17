import TaskModel from "../../models/task.mjs";

class TaskRepositry {
    /**
     *
     * @description Create new Task Object
     */
    static async CreateNewObjectRepository({ taskData }) {
        try {
            const data = await TaskModel.create(taskData);
            return data;
        } catch (error) {
            return error;
        }
    }
    /**
     *
     * @description Fetch Task by ID JSON data 
     */
    static async GetTaskByID({ taskId }) {
        try {
            const data = await TaskModel.find({ _id: taskId });
            return data;
        } catch (error) {
            return error;
        }
    }
    /**
    *
    * @description Fetch all User JSON data 
    */
    static async GetAllTask() {
        try {
            const data = await TaskModel.find({})
            return data;
        } catch (error) {
            return error;
        }
    }
    /**
    *
    * @description Update all User JSON data 
    */
    static async UpdateTaskStatus({ taskID, updateData }) {
        try {
            const data = await TaskModel.findByIdAndUpdate(
                taskID,
                updateData
                , { new: true, runValidators: true })
            return data;
        } catch (error) {
            return error;
        }
    }
    /**
   *
   * @description Delete User JSON data 
   */
    static async DeleteUsers({ taskId }) {
        try {
            const data = await TaskModel.findByIdAndDelete(taskId)
            return data;
        } catch (error) {
            return error;
        }
    }
}

export default TaskRepositry;
