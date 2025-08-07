import { Router } from "express";
import UserController from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const userRouter: Router = Router();
const userController: UserController = new UserController();
const authMiddleware: AuthMiddleware = new AuthMiddleware();

userRouter.get(
  "/users",
  authMiddleware.authenticate,
  userController.getUsers.bind(userController)
);
userRouter.get(
  "/users/:id",
  authMiddleware.authenticate,
  userController.getUserbyId.bind(userController)
);

export default userRouter;
