import bcrypt from "bcrypt";
import db from "../databases/database";
import { UserDTO } from "../models/user.dto";
import { ApiResult, ResultBuilder } from "../utils/result";

class UserService {
  public async findAllUsers(): Promise<ApiResult<UserDTO[]>> {
    try {
      const users = await db.selectFrom("users").selectAll().execute();

      if (!users || users.length === 0) {
        return ResultBuilder.success({
          statusCode: 200,
          message: "Tidak ada pengguna ditemukan",
          data: [],
        });
      }

      const userDTOs = users.map(
        (user) =>
          ({
            id: user.id,
            name: user.name,
            email: user.email,
          } as UserDTO)
      );

      return ResultBuilder.success({
        statusCode: 200,
        message: "Berhasil mendapatkan semua pengguna",
        data: userDTOs,
      });
    } catch (error) {
      console.error("Error finding all users:", error);
      return ResultBuilder.internalServerError();
    }
  }

  public async findUserById(id: number): Promise<ApiResult<UserDTO | null>> {
    try {
      const user = await db
        .selectFrom("users")
        .where("id", "=", id)
        .selectAll()
        .executeTakeFirst();

      if (!user) {
        return ResultBuilder.success({
          statusCode: 404,
          message: `Pengguna dengan ID ${id} tidak ditemukan`,
        });
      }

      const userDTO: UserDTO = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      return ResultBuilder.success({
        statusCode: 200,
        message: `Pengguna dengan ID ${id} ditemukan`,
        data: userDTO,
      });
    } catch (error) {
      console.error("Error finding user by ID:", error);
      return ResultBuilder.internalServerError();
    }
  }

  public async findUserByEmail(email: string): Promise<ApiResult<UserDTO>> {
    try {
      const user = await db
        .selectFrom("users")
        .selectAll()
        .where("email", "=", email)
        .executeTakeFirst();

      if (!user) {
        return ResultBuilder.success({
          statusCode: 404,
          message: `Pengguna dengan email ${email} tidak ditemukan`,
        });
      }

      const userDTO: UserDTO = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      return ResultBuilder.success({
        statusCode: 200,
        message: `Pengguna dengan email ${email} ditemukan`,
        data: userDTO,
      });
    } catch (error) {
      console.error("Error finding user by email:", error);
      return ResultBuilder.internalServerError();
    }
  }

  public async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<ApiResult<UserDTO>> {
    try {
      const existingUserResult = await this.findUserByEmail(email);

      if (!existingUserResult.success) {
        return existingUserResult;
      }

      if (existingUserResult.statusCode === 200) {
        return ResultBuilder.error({
          statusCode: 409,
          message: `Pengguna dengan email ${email} sudah ada. Silahkan gunakan email lain.`,
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const createdUser = await db
        .insertInto("users")
        .values({
          name: name,
          email: email,
          password: hashedPassword,
        })
        .returningAll()
        .executeTakeFirst();

      if (!createdUser) {
        return ResultBuilder.internalServerError();
      }

      const userDTO: UserDTO = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      };

      return ResultBuilder.success({
        statusCode: 201,
        message: "Berhasil membuat pengguna!",
        data: userDTO,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return ResultBuilder.internalServerError();
    }
  }
}

export default UserService;
