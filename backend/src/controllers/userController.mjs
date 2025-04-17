
import UserRepositry from "../app/repositories/userRepositry.mjs";
import { RESPONSE_MESSAGES, API_STATUS_CODES } from "../constant/apiStatus.mjs";

class UserController {
  /**
   * @param {Object} req
   * @param {Object} res
   * @description Save an array of Surah objects to the database Controller
   */
  static async CreateNewObjectController(req, res) {
    try {
      const userData = req.body;
      const result = await UserRepositry.CreateNewObjectRepository({ userData });

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
  static async GetAllUsersByIdController(req, res) {
    try {
      const { userId } = req.params;
      const result = await UserRepositry.GetAllUsersByID({ userId });

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
  static async GetAllUsersController(req, res) {
    try {
      const result = await UserRepositry.GetAllUsers();

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
  static async UpdateUsersController(req, res) {
    try {
      const updateData = req.body;
      const { userId } = req.params;
      const result = await UserRepositry.UpdateUsers({ userId, updateData });

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
   static async DeleteUsersController(req, res) {
    try {
      const { userId } = req.params;
      const result = await UserRepositry.DeleteUsers({ userId });

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

export default UserController;
