import { DotenvConfigOutput } from "dotenv/types";
import environments from "./environments";

if (process.env.NODE_ENV !== "production") {
  const environment: DotenvConfigOutput = environments;
}

export const SECRET_KEY: string = process.env.SECRET || "AlexanderCastillo292";
