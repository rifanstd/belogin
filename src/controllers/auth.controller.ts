import { Request, Response } from "express";
import UserService from "../services/user.service";
import { ResultBuilder } from "../utils/result";
import { AuthService } from "../services/auth.service";

class AuthController {
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await this.authService.signIn(email, password);

    return res.status(result.statusCode).json(result);
  }

  public async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const result = await this.userService.createUser(name, email, password);

    return res.status(result.statusCode).json(result);
  }
}

export default AuthController;
