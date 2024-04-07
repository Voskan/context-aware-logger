import { LogContext } from "./context";
/**
 * Formats a log message by adding contextual information to it.
 * This version simplifies the output and focuses on readability.
 * @param message Log message.
 * @param level Logging level.
 * @param context Additional context for the log.
 * @returns Formatted log message.
 */
export declare function formatMessage(message: string, level: string, context?: LogContext): string;
