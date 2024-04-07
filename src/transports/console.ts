import { LoggerTransport, LogLevel } from "../utils/types";
import { formatMessage } from "../utils/formatter";

/**
 * ConsoleTransport - class for outputting logs to the console.
 */
export class ConsoleTransport implements LoggerTransport {
  /**
   * Prints a log message to the console.
   * @param message - Log message.
   * @param level - Logging level (for example, 'info', 'error').
   */
  log(message: string, level: LogLevel = "info"): void {
    const formattedMessage = formatMessage(message, level);

    switch (level) {
      case "error":
        console.error(formattedMessage);
        break;
      case "warn":
        console.warn(formattedMessage);
        break;
      case "debug":
        console.debug(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }
  }
}
