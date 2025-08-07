import UserService from "../services/user.service";
import { Request, Response } from "express";
import { ResultBuilder } from "../utils/result";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public async getUsers(req: Request, res: Response) {
    const { email } = req.query;

    if (email) {
      const result = await this.userService.findUserByEmail(email as string);
      return res.status(result.statusCode).json(result);
    }

    const result = await this.userService.findAllUsers();

    return res.status(result.statusCode).json(result);
  }

  public async getUserbyId(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);

    const result = await this.userService.findUserById(userId);

    return res.status(result.statusCode).json(result);
  }
}

export default UserController;
