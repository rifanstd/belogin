import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = "1d";

export interface JWTPayload {
  id: number;
  email: string;
}

export class JWTUtils {
  static isUseRSA: Boolean = true;
  public static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: JWT_EXPIRATION,
    });
  }

  public static generateTokenRSA(payload: JWTPayload): string {
    const privateKey = fs.readFileSync(
      path.join(__dirname, "../keys/private.key")
    );

    return jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: JWT_EXPIRATION,
    });
  }

  public static verify(token: string): JWTPayload {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  }

  public static verifyRSA(token: string): JWTPayload {
    const publicKey = fs.readFileSync(
      path.join(__dirname, "../keys/public.key")
    );

    return jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    }) as JWTPayload;
  }
}
