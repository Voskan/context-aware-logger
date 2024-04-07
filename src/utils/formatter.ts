import { LogContext } from "./context";

/**
 * Formats a log message by adding contextual information to it.
 * @param message Log message.
 * @param level Logging level.
 * @param context Additional context for the log.
 * @returns Formatted log message.
 */
export function formatMessage(
  message: string,
  level: string,
  context?: LogContext
): string {
  const baseContext: any = {
    level,
    ...context,
  };

  if (!baseContext.timestamp) {
    baseContext.timestamp = new Date().toISOString();
  }

  // Convert the context to a string to append to the message
  const contextString = Object.keys(baseContext)
    .map((key) => `${key}: ${baseContext[key]}`)
    .join(", ");

  return `[${
    baseContext.timestamp
  }] [${level.toUpperCase()}] ${message} {${contextString}}`;
}
