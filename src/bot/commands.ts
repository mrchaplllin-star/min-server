import type { Telegraf } from "telegraf";
import type { AppConfig } from "../config";
import { logger } from "../utils/logger";
import { sendHelpMessage, sendToChannel, sendWelcomeMessage } from "./handlers";

export const registerCommands = (bot: Telegraf, config: AppConfig): void => {
  bot.start(async (ctx) => {
    await sendWelcomeMessage(ctx);
  });

  bot.command("help", async (ctx) => {
    await sendHelpMessage(ctx);
  });

  bot.command("settings", async (ctx) => {
    await ctx.reply("Settings are not implemented yet");
  });

  bot.command("talk", async (ctx) => {
    // Future OpenAI conversation mode entry point should be wired here.
    await ctx.reply("Conversation mode will be added next");
  });

  bot.command("finish", async (ctx) => {
    // Future reporting/session analysis logic should be wired here.
    await ctx.reply("Session analysis will be added next");
  });

  bot.command("dictionary", async (ctx) => {
    // Future Supabase dictionary export logic should be wired here.
    await ctx.reply("Dictionary export will be added next");
  });

  bot.command("words", async (ctx) => {
    // Future vocabulary statistics logic should be wired here.
    await ctx.reply("Vocabulary stats will be added next");
  });

  bot.command("posttest", async (ctx) => {
    try {
      await sendToChannel(bot, config.telegramChannelId, "Test post from bot");
      await ctx.reply("Post test completed. Check your configured channel.");
    } catch (error) {
      logger.error("/posttest failed.", error);
      await ctx.reply(
        "Unable to post to the channel. Please verify TELEGRAM_CHANNEL_ID and bot admin permissions."
      );
    }
  });
};
