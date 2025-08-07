import UserService from "../services/user.service";
import { Request, Response } from "express";
import { ResultBuilder } from "../utils/result";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public async getAllUsers(req: Request, res: Response) {
    const result = await this.userService.findAllUsers();

    if (!result.success) {
      return res.status(result.statusCode).json({
        message: result.message,
      });
    }

    return res.status(result.statusCode).json({
      message: result.message,
      data: result.data,
    });
  }

  public async getUserbyId(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);

    const result = await this.userService.findUserById(userId);

    if (!result.success) {
      return res.status(result.statusCode).json({
        message: result.message,
      });
    }

    return res.status(result.statusCode).json({
      message: result.message,
      data: result.data,
    });
  }
}

export default UserController;
