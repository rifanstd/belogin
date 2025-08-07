import { Request, Response } from "express";
import UserService from "../services/user.service";
import { ResultBuilder } from "../utils/result";

class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const result = await this.userService.createUser(name, email, password);

      if (!result.success) {
        return res.status(result.statusCode).json({
          message: result.message,
        });
      }

      return res.status(result.statusCode).json({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.error("Error during registration:", error);
      return ResultBuilder.internalServerError();
    }
  }
}

export default AuthController;
