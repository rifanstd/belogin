import dotenv from "dotenv";
import { get } from "http";
import path from "path";

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env.${process.env.NODE_ENV || "development"}`
  ),
});

function getEnv(key: string, required = true): string {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value || "";
}

export const ENV = {
  NODE_ENV: getEnv("NODE_ENV"),
  PORT: Number(getEnv("PORT")),
  JWT_SECRET: getEnv("JWT_SECRET"),
  DB: {
    NAME: getEnv("DB_NAME"),
    HOST: getEnv("DB_HOST"),
    PORT: Number(getEnv("DB_PORT")),
    USER: getEnv("DB_USER"),
    PASSWORD: getEnv("DB_PASSWORD"),
  },
};
