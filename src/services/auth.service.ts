import bcrypt from "bcrypt";
import { SignInDTO } from "../models/singin.dto";
import { ApiResult, ResultBuilder } from "../utils/result";
import db from "../databases/database";
import { JWTUtils } from "../utils/jwt";

export class AuthService {
  public async signIn(
    email: string,
    password: string
  ): Promise<ApiResult<SignInDTO>> {
    try {
      const user = await db
        .selectFrom("users")
        .where("email", "=", email)
        .selectAll()
        .executeTakeFirst();

      if (!user) {
        return ResultBuilder.error({
          statusCode: 404,
          message: `Pengguna dengan email ${email} tidak ditemukan`,
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return ResultBuilder.error({
          statusCode: 401,
          message: "Kata sandi salah",
        });
      }

      const token = JWTUtils.generateToken({ id: user.id, email: user.email });

      const signInDTO: SignInDTO = {
        email: user.email,
        token: token,
      };

      return ResultBuilder.success({
        statusCode: 200,
        message: "Berhasil masuk",
        data: signInDTO,
      });
    } catch (error) {
      console.error("Error during sign-in:", error);
      return ResultBuilder.internalServerError();
    }
  }
}
