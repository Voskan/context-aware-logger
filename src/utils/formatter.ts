import { LogContext } from "./context";

/**
 * Formats a log message by adding contextual information to it.
 * This version simplifies the output and focuses on readability.
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
  // Prepare additional context excluding the timestamp and level for cleaner output
  const additionalContext = { ...context };
  delete additionalContext.timestamp;
  delete additionalContext.level;

  // Convert additional context to a string only if it's not empty
  let contextString = "";
  const keys = Object.keys(additionalContext);
  if (keys.length > 0) {
    contextString = keys
      .map((key) => `${key}: ${additionalContext[key]}`)
      .join(", ");
    contextString = ` {${contextString}}`;
  }

  return `[${level.toUpperCase()}] ${message}${contextString}`;
}
