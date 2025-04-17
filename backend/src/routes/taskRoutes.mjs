import express from 'express';
import jwtMiddleware from '../middleware/jwtMiddleware.mjs';
import TaskController from '../controllers/taskController.mjs';

const TaskRoutes = express.Router();

TaskRoutes.post('/tasks', jwtMiddleware, TaskController.CreateNewObjectController);
TaskRoutes.get('/tasks/:taskId', jwtMiddleware, TaskController.GetTaskByIdController);
TaskRoutes.get('/tasks', jwtMiddleware, TaskController.GetAllTaskController);
TaskRoutes.put('/tasks/:taskId', jwtMiddleware, TaskController.UpdateTaskController);
TaskRoutes.delete('/tasks/:taskId', jwtMiddleware, TaskController.DeleteTaskController);

export default TaskRoutes;
