import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const authRouter: Router = Router();
const authController: AuthController = new AuthController();

authRouter.post("/auth/login", authController.login.bind(authController));
authRouter.post("/auth/register", authController.register.bind(authController));

export default authRouter;
