import { promises as fs } from "fs";
import { LoggerTransport } from "../utils/types";
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
   * Asynchronously writes a log message to a file.
   * @param message - Log message.
   */
  async log(message: string): Promise<void> {
    try {
      const formattedMessage = formatMessage(message);

      await fs.appendFile(this.filePath, formattedMessage + "\n", "utf8");
    } catch (error) {
      console.error(`Error writing to log file:`, error);
    }
  }
}
