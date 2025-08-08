import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = "1d";

export interface JWTPayload {
  id: number;
  email: string;
}

export class JWTUtils {
  public static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: JWT_EXPIRATION,
    });
  }

  public static verify(token: string): JWTPayload {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  }
}
