import UserModel from "../../models/user.mjs";

class UserRepositry {
  /**
   *
   * @description Create new User Object
   */
  static async CreateNewObjectRepository({ userData }) {
    try {
      const data = await UserModel.create(userData);
      return data;
    } catch (error) {
      return error;
    }
  }
  /**
   *
   * @description Fetch all User JSON data 
   */
  static async GetAllUsersByID({ userId }) {
    try {
      const data = await UserModel.find({ _id: userId });
      return data;
    } catch (error) {
      return error;
    }
  }
  /**
  *
  * @description Fetch all User JSON data 
  */
  static async GetAllUsers() {
    try {
      const data = await UserModel.find({})
      return data;
    } catch (error) {
      return error;
    }
  }
  /**
  *
  * @description Update all User JSON data 
  */
  static async UpdateUsers({ userId, updateData }) {
    try {
      const data = await UserModel.findByIdAndUpdate(
        userId,
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
   static async DeleteUsers({ userId }) {
    try {
      const data = await UserModel.findByIdAndDelete(userId)
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default UserRepositry;
