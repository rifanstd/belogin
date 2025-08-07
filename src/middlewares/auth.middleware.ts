import { NextFunction, Request, Response } from "express";
import { ResultBuilder } from "../utils/result";
import { JWTUtils } from "../utils/jwt";

export class AuthMiddleware {
  public authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      JWTUtils.verify(token);
      next();
    } catch (error) {
      console.log("Error verifying token:", error);
      return res
        .status(401)
        .json({ message: "Token tidak valid atau kadaluarsa!" });
    }
  }
}
