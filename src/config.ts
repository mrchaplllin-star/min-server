import dotenv from "dotenv";
import { logger } from "./utils/logger";

dotenv.config();

export type AppConfig = {
  telegramBotToken: string;
  telegramChannelId: string;
  port: number;
  nodeEnv: string;
};

const requiredEnvVars = ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHANNEL_ID"] as const;

const validateRequiredEnvVars = (): void => {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    const message = `Missing required environment variables: ${missing.join(", ")}`;
    logger.error(message);
    throw new Error(message);
  }
};

export const loadConfig = (): AppConfig => {
  validateRequiredEnvVars();

  const port = Number(process.env.PORT ?? "3000");
  if (Number.isNaN(port) || port <= 0) {
    throw new Error("PORT must be a valid positive number");
  }

  return {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN as string,
    telegramChannelId: process.env.TELEGRAM_CHANNEL_ID as string,
    port,
    nodeEnv: process.env.NODE_ENV ?? "development"
  };
};
