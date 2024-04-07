/**
 * Defines logging levels.
 */
export type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * Defines the structure of the log context.
 */
export interface LogContext {
  timestamp?: string;
  [key: string]: any;
}

/**
 * The interface that every logging transport must implement.
 */
export interface LoggerTransport {
  log: (
    message: string,
    level: LogLevel,
    context?: LogContext
  ) => void | Promise<void>;
}
