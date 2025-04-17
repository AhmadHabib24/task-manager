import { mongoose } from "../db/connectionDB.mjs";
import TaskModel from "../models/task.mjs";
import UserModel from "../models/user.mjs";

const db = {}

db.mongoose = mongoose;
db.UserModel = UserModel
db.TaskModel = TaskModel

export default db