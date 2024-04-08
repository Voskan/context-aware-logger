import { promises as fs } from "fs";
import { LoggerTransport, LogContext, LogLevel } from "../utils/types";

/**
 * Implements a logging transport that writes logs to a file. Supports writing
 * in different formats based on the file extension, including plain text and JSON.
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
   * Writes a log message to the file, formatted according to the file's extension.
   * @param message - The log message to write.
   * @param level - The severity level of the log message.
   * @param context - Optional context to include with the message.
   */
  async log(
    message: string,
    level: LogLevel,
    context?: LogContext
  ): Promise<void> {
    const formattedMessage = this.formatMessageForFile(message, level, context);

    try {
      await this.appendLogToFile(formattedMessage);
    } catch (error) {
      console.error(`Error writing to log file:`, error);
    }
  }

  /**
   * Appends a formatted log message to the file. For JSON files, ensures that
   * the logs are stored as an array of log objects.
   * @param message - The formatted log message to append.
   */
  private async appendLogToFile(message: string): Promise<void> {
    try {
      const fileExtension = this.filePath.split(".").pop();

      if (fileExtension === "json") {
        // Check if the file exists and is not empty
        let stats;
        try {
          stats = await fs.stat(this.filePath);
        } catch (error: any) {
          if (error.code !== "ENOENT") throw error; // Ignore errors other than "file does not exist"
        }

        if (stats && stats.size > 0) {
          // Remove the last character (presumably `]`) before appending a new object
          await fs.truncate(this.filePath, stats.size - 1);
          // Append the new log object, preceded by a comma if the file isn't empty
          await fs.appendFile(this.filePath, `,${message}]`, "utf8");
        } else {
          // Start a new array with the log object if the file is empty
          await fs.writeFile(this.filePath, `[${message}]`, "utf8");
        }
      } else {
        // For non-JSON files, simply append the message
        await fs.appendFile(this.filePath, message + "\n", "utf8");
      }
    } catch (error) {
      console.error(`Error appending to log file:`, error);
    }
  }

  /**
   * Formats a log message for writing to the file, adjusting the format based on the file's extension.
   * @param message - The log message to format.
   * @param level - The severity level of the log message.
   * @param context - Optional context to include with the message.
   * @returns The formatted log message.
   */
  private formatMessageForFile(
    message: string,
    level: LogLevel,
    context?: LogContext
  ): string {
    const fileExtension = this.filePath.split(".").pop();
    if (fileExtension === "json") {
      // Format as a JSON object for JSON files
      return JSON.stringify({
        level,
        message,
        timestamp: new Date().toISOString(),
        ...context,
      });
    } else {
      // Format as a plain text string for other file types
      const contextString = context
        ? Object.keys(context)
            .map((key) => `${key}: ${context[key]}`)
            .join(", ")
        : "";
      return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message} {${contextString}}`;
    }
  }
}
