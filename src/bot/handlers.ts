import type { Context, Telegraf } from "telegraf";
import { logger } from "../utils/logger";

const commandList = [
  "/start - Start the bot",
  "/help - Learn what this bot can do",
  "/settings - View bot settings",
  "/talk - Enter conversation mode",
  "/finish - Finish a session",
  "/dictionary - Export dictionary",
  "/words - Show vocabulary stats",
  "/posttest - Post a test message to the configured channel"
].join("\n");

export const sendWelcomeMessage = async (ctx: Context): Promise<void> => {
  await ctx.reply(`Welcome! 👋\n\nAvailable commands:\n${commandList}`);
};

export const sendHelpMessage = async (ctx: Context): Promise<void> => {
  await ctx.reply(
    "This bot is the foundation for an Italian learning assistant. " +
      "For now, it supports command handling and channel posting tests. " +
      "OpenAI conversation logic, database storage, and automated reports will be added next."
  );
};

export const sendToChannel = async (
  bot: Telegraf,
  channelId: string,
  message: string
): Promise<void> => {
  try {
    await bot.telegram.sendMessage(channelId, message);
    logger.info(`Channel message sent successfully to ${channelId}.`);
  } catch (error) {
    logger.error(`Failed to send message to channel ${channelId}.`, error);
    throw error;
  }
};
