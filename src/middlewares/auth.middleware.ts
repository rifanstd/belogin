import { NextFunction, Request, Response } from "express";
import { ResultBuilder } from "../utils/result";
import { JWTUtils } from "../utils/jwt";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";

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
      if (JWTUtils.isUseRSA) {
        console.log("Auth Middleware | Use RSA");
        JWTUtils.verifyRSA(token);
      } else {
        console.log("Auth Middleware | Use HMAC");
        JWTUtils.verify(token);
      }
      next();
    } catch (error) {
      let message = "";
      if (error instanceof TokenExpiredError) {
        message = "Token kadaluarsa!";
      } else if (error instanceof JsonWebTokenError) {
        message = "Token tidak valid!";
      } else if (error instanceof NotBeforeError) {
        message = "Token belum aktif!";
      } else {
        message = "Unauthorized";
      }
      return res.status(401).json({ message: message });
    }
  }
}
