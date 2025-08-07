import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const authRouter: Router = Router();
const authController: AuthController = new AuthController();

authRouter.post("/login", (req, res) => {
  res.send("Login route");
});

authRouter.post("/register", authController.register.bind(authController));

export default authRouter;
