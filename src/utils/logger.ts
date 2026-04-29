/* Simple logger utility that can be replaced by a full logging stack later. */

const formatMessage = (level: string, message: string): string => {
  return `[${new Date().toISOString()}] [${level}] ${message}`;
};

export const logger = {
  info: (message: string): void => {
    console.log(formatMessage("INFO", message));
  },
  warn: (message: string): void => {
    console.warn(formatMessage("WARN", message));
  },
  error: (message: string, error?: unknown): void => {
    console.error(formatMessage("ERROR", message));
    if (error) {
      console.error(error);
    }
  }
};
