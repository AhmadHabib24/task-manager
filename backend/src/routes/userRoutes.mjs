import express from 'express';
import jwtMiddleware from '../middleware/jwtMiddleware.mjs';
import UserController from '../controllers/userController.mjs';

const UserRoutes = express.Router();

UserRoutes.post('/users', jwtMiddleware, UserController.CreateNewObjectController);
UserRoutes.get('/users/:userId', jwtMiddleware, UserController.GetAllUsersByIdController);
UserRoutes.get('/users', jwtMiddleware, UserController.GetAllUsersController);
UserRoutes.put('/users/:userId', jwtMiddleware, UserController.UpdateUsersController);
UserRoutes.delete('/users/:userId', jwtMiddleware, UserController.DeleteUsersController);

export default UserRoutes;
