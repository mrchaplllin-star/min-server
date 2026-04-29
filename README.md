# Telegram Italian Assistant Starter (Node.js + TypeScript)

This project is a production-ready starter for a Telegram bot that will become an Italian learning assistant.

> Current scope: Telegram bot foundation + channel posting support.  
> Not included yet: OpenAI, Supabase, Activepieces, Docker, database.

## Tech Stack

- Node.js 20+
- TypeScript
- [Telegraf](https://telegraf.js.org/) for Telegram bot logic

## Project Structure

```text
src/
  ai/                 # Placeholder for future OpenAI integration
  bot/
    commands.ts       # Bot commands registration
    handlers.ts       # Reusable handlers (including channel posting)
  db/                 # Placeholder for future Supabase/database layer
  reports/            # Placeholder for future reporting/session analysis
  vocabulary/         # Placeholder for future vocabulary logic
  config.ts           # Environment loading + validation
  index.ts            # App bootstrap + startup/shutdown lifecycle
  utils/
    logger.ts         # Simple logger utility
```

## 1) Install dependencies

```bash
npm install
```

## 2) Create your Telegram bot (BotFather)

1. Open Telegram and search for `@BotFather`.
2. Run `/newbot` and follow prompts.
3. BotFather returns your **bot token**.

## 3) Configure environment variables

Copy `.env.example` to `.env` and fill values:

```bash
cp .env.example .env
```

Required values:

- `TELEGRAM_BOT_TOKEN` - token from BotFather
- `TELEGRAM_CHANNEL_ID` - target channel username (e.g. `@my_channel`) or channel numeric id
- `PORT` - local health server port (default `3000`)
- `NODE_ENV` - `development` or `production`

## 4) Set bot commands in BotFather

In `@BotFather`:

1. Run `/setcommands`
2. Select your bot
3. Paste:

```text
start - Start the bot
help - Learn what this bot can do
settings - View bot settings
talk - Enter conversation mode
finish - Finish a session
dictionary - Export dictionary
words - Show vocabulary stats
posttest - Post a test message to the configured channel
```

## 5) Add the bot to your Telegram channel as admin

1. Open your channel settings.
2. Add your bot as a channel member.
3. Promote the bot to **Admin**.
4. Ensure it has permission to post messages.
5. Set `TELEGRAM_CHANNEL_ID` to that channel (e.g. `@your_channel`).

## 6) Run locally

```bash
npm run dev
```

You should see startup logs in the terminal.

## 7) Test `/posttest`

1. Open private chat with your bot.
2. Send `/posttest`.
3. Bot attempts to post `Test post from bot` to your configured channel.
4. If it fails, verify:
   - `TELEGRAM_CHANNEL_ID`
   - bot is admin in that channel
   - bot token is valid

## Implemented Commands

- `/start` -> welcome message + command list
- `/help` -> simple explanation
- `/settings` -> `Settings are not implemented yet`
- `/talk` -> `Conversation mode will be added next`
- `/finish` -> `Session analysis will be added next`
- `/dictionary` -> `Dictionary export will be added next`
- `/words` -> `Vocabulary stats will be added next`
- `/posttest` -> channel posting smoke test

## Notes for Future Integrations

- Add OpenAI logic in `src/ai/` and wire it from `/talk`.
- Add Supabase/data logic in `src/db/` and dictionary/vocabulary features.
- Add session reporting in `src/reports/` for `/finish`.
