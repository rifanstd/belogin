import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRouter: Router = Router();
const userController: UserController = new UserController();

userRouter.get("/", userController.getAllUsers.bind(userController));
userRouter.get("/:id", userController.getUserbyId.bind(userController));

export default userRouter;
