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
   * Asynchronously writes a log message to a file, ensuring the file is created if it does not exist.
   * @param message - Log message.
   * @param level - Log level
   */
  async log(message: string, level: string): Promise<void> {
    try {
      const formattedMessage = formatMessage(message, level);

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
