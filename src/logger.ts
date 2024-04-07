import { LogLevel, LoggerTransport, LogContext } from "./utils/types";
import { enrichContext, generateBaseContext } from "./utils/context";
import { formatMessage } from "./utils/formatter";

/**
 * Main logger class.
 */
class Logger {
  private transports: LoggerTransport[] = [];

  /**
   * Adds a transport to the list of logger transports.
   * @param transport Transport to add.
   */
  addTransport(transport: LoggerTransport): void {
    this.transports.push(transport);
  }

  /**
   * Logs a message at a given level with a given context.
   * @param level Logging level.
   * @param message Logging message.
   * @param context Additional context (optional).
   */
  private log(level: LogLevel, message: string, context?: LogContext): void {
    const baseContext = generateBaseContext();
    const fullContext = enrichContext(baseContext, context || {});
    const formattedMessage = formatMessage(message, level, fullContext);

    this.transports.forEach((transport) => {
      transport.log(formattedMessage, level, fullContext);
    });
  }

  debug(message: string, context?: LogContext): void {
    this.log("debug", message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log("info", message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log("warn", message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log("error", message, context);
  }
}

export { Logger };
