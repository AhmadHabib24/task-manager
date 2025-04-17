
import TaskRepositry from "../app/repositories/taskRepositry.mjs";
import { RESPONSE_MESSAGES, API_STATUS_CODES } from "../constant/apiStatus.mjs";

class TaskController {
  /**
   * @param {Object} req
   * @param {Object} res
   * @description Save an array of Surah objects to the database Controller
   */
  static async CreateNewObjectController(req, res) {
    try {
      const taskData = req.body;
      const result = await TaskRepositry.CreateNewObjectRepository({ taskData });

      let Response = {};
      Response = {
        statusCode: API_STATUS_CODES.SUCCESS,
        message: RESPONSE_MESSAGES.SUCCESS,
        data: result,
      };
      return res.status(API_STATUS_CODES.SUCCESS).json(Response);
    } catch (error) {
      return res.status(API_STATUS_CODES.ERROR_CODE).json({
        statusCode: API_STATUS_CODES.ERROR_CODE,
        message: RESPONSE_MESSAGES.AUTHORIZATION_FAILED,
      });
    }
  }
  /**
   * @param {Object} req
   * @param {Object} res
   * @description Get objects By Chapter Number
   */
  static async GetTaskByIdController(req, res) {
    try {
      const { taskId } = req.params;
      const result = await TaskRepositry.GetTaskByID({ taskId });

      let Response = {};
      Response = {
        statusCode: API_STATUS_CODES.SUCCESS,
        message: RESPONSE_MESSAGES.SUCCESS,
        data: result,
      };
      return res.status(API_STATUS_CODES.SUCCESS).json(Response);
    } catch (error) {
      return res.status(API_STATUS_CODES.ERROR_CODE).json({
        statusCode: API_STATUS_CODES.ERROR_CODE,
        message: RESPONSE_MESSAGES.AUTHORIZATION_FAILED,
      });
    }
  }
  /**
  * @param {Object} req
  * @param {Object} res
  * @description Get objects All
  */
  static async GetAllTaskController(req, res) {
    try {
      const result = await TaskRepositry.GetAllTask();

      let Response = {};
      Response = {
        statusCode: API_STATUS_CODES.SUCCESS,
        message: RESPONSE_MESSAGES.SUCCESS,
        data: result,
      };
      return res.status(API_STATUS_CODES.SUCCESS).json(Response);
    } catch (error) {
      return res.status(API_STATUS_CODES.ERROR_CODE).json({
        statusCode: API_STATUS_CODES.ERROR_CODE,
        message: RESPONSE_MESSAGES.AUTHORIZATION_FAILED,
      });
    }
  }
  /**
  * @param {Object} req
  * @param {Object} res
  * @description Get objects All
  */
  static async UpdateTaskController(req, res) {
    try {
      const updateData = req.body;
      const { taskId } = req.params;
      
      const result = await TaskRepositry.UpdateTaskStatus({ taskId, updateData });

      let Response = {};
      Response = {
        statusCode: API_STATUS_CODES.SUCCESS,
        message: RESPONSE_MESSAGES.SUCCESS,
        data: result,
      };
      return res.status(API_STATUS_CODES.SUCCESS).json(Response);
    } catch (error) {
      return res.status(API_STATUS_CODES.ERROR_CODE).json({
        statusCode: API_STATUS_CODES.ERROR_CODE,
        message: RESPONSE_MESSAGES.AUTHORIZATION_FAILED,
      });
    }
  }
   /**
  * @param {Object} req
  * @param {Object} res
  * @description Delet objects All
  */
   static async DeleteTaskController(req, res) {
    try {
      const { taskId } = req.params;
      const result = await TaskRepositry.DeleteUsers({ taskId });

      let Response = {};
      Response = {
        statusCode: API_STATUS_CODES.SUCCESS,
        message: RESPONSE_MESSAGES.SUCCESS,
        data: result,
      };
      return res.status(API_STATUS_CODES.SUCCESS).json(Response);
    } catch (error) {
      return res.status(API_STATUS_CODES.ERROR_CODE).json({
        statusCode: API_STATUS_CODES.ERROR_CODE,
        message: RESPONSE_MESSAGES.AUTHORIZATION_FAILED,
      });
    }
  }
}

export default TaskController;
