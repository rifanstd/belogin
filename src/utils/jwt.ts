import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "rifanstd";
const JWT_EXPIRATION = "1h";

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
