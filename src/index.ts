import http from "node:http";
import { Telegraf } from "telegraf";
import { loadConfig } from "./config";
import { registerCommands } from "./bot/commands";
import { logger } from "./utils/logger";

const bootstrap = async (): Promise<void> => {
  try {
    const config = loadConfig();
    const bot = new Telegraf(config.telegramBotToken);

    registerCommands(bot, config);

    bot.catch((error, ctx) => {
      logger.error(`Telegram API error while processing update ${ctx.update.update_id}.`, error);
    });

    const healthServer = http.createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", environment: config.nodeEnv }));
    });

    healthServer.listen(config.port, () => {
      logger.info(`Health endpoint listening on port ${config.port}.`);
    });

    await bot.launch();
    logger.info("Telegram bot started successfully.");

    const shutdown = async (signal: NodeJS.Signals): Promise<void> => {
      logger.info(`Received ${signal}. Starting graceful shutdown...`);
      healthServer.close();
      await bot.stop(signal);
      logger.info("Shutdown completed.");
      process.exit(0);
    };

    process.once("SIGINT", () => void shutdown("SIGINT"));
    process.once("SIGTERM", () => void shutdown("SIGTERM"));
  } catch (error) {
    logger.error("Application failed to start.", error);
    process.exit(1);
  }
};

void bootstrap();
