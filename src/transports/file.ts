import { promises as fs } from "fs";
import { LoggerTransport, LogLevel, LogContext } from "../utils/types";
import { formatMessage } from "../utils/formatter";

/**
 * FileTransport - class for writing logs to a file.
 */
export class FileTransport implements LoggerTransport {
  private filePath: string;

  /**
   * Creates a FileTransport instance.
   * @param filePath - Path to the file where logs will be written.
   */
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  /**
   * Returns a formatter based on the file extension.
   */
  private formatMessageForFile(
    message: string,
    level: LogLevel,
    context?: LogContext
  ): string {
    const fileExtension = this.filePath.split(".").pop();

    switch (fileExtension) {
      case "json":
        return JSON.stringify({
          level,
          message,
          timestamp: new Date().toISOString(),
          ...context,
        });
      case "log":
      case "txt":
      default:
        const contextString = context
          ? Object.keys(context)
              .map((key) => `${key}: ${context[key]}`)
              .join(", ")
          : "";
        return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message} {${contextString}}`;
    }
  }

  /**
   * Asynchronously writes a log message to a file, ensuring the file is created if it does not exist.
   * @param message - Log message.
   * @param level - Log level
   */
  async log(
    message: string,
    level: LogLevel,
    context?: LogContext
  ): Promise<void> {
    try {
      // const formattedMessage = formatMessage(message, level);
      const formattedMessage = this.formatMessageForFile(
        message,
        level,
        context
      );

      // Ensure the file is opened for appending, which creates the file if it does not exist.
      const fileHandle = await fs.open(this.filePath, "a");
      await fs.appendFile(fileHandle, formattedMessage + "\n", "utf8");

      // It's important to close the file handle after operations are complete to free up resources.
      await fileHandle.close();
    } catch (error) {
      console.error(`Error writing to log file:`, error);
    }
  }
}
