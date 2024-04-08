import { promises as fs } from "fs";
import { LoggerTransport, LogContext, LogLevel } from "../utils/types";

/**
 * FileTransport is responsible for writing log messages to a file.
 * It supports buffering to optimize disk I/O operations.
 */
export class FileTransport implements LoggerTransport {
  private filePath: string;
  private logBuffer: string[] = [];
  private bufferSize: number = 0;
  private maxBufferSize: number;
  private flushInterval: number;
  private flushTimer: NodeJS.Timeout | null = null;

  /**
   * Creates a FileTransport instance.
   * @param filePath - Path to the file where logs will be written.
   * @param maxBufferSize - Maximum size of the buffer in bytes before flushing to the file.
   * @param flushInterval - Time interval in milliseconds for flushing the buffer to the file.
   */
  constructor(
    filePath: string,
    maxBufferSize: number = 1024 * 10,
    flushInterval: number = 5000
  ) {
    this.filePath = filePath;
    this.maxBufferSize = maxBufferSize;
    this.flushInterval = flushInterval;
    this.startFlushTimer();
  }

  /**
   * Writes a log message to the buffer. Flushes the buffer to the file if it exceeds the maxBufferSize or
   * according to the flushInterval.
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
    this.logBuffer.push(formattedMessage);
    this.bufferSize += Buffer.byteLength(formattedMessage, "utf8");

    if (this.bufferSize >= this.maxBufferSize) {
      await this.flushBuffer();
    }
  }

  /**
   * Starts a timer to flush the buffer to the file at regular intervals defined by flushInterval.
   */
  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => {
      this.flushBuffer().catch(console.error);
    }, this.flushInterval);
  }

  /**
   * Flushes the buffer to the file and clears it. Used both when the buffer is full and at regular flush intervals.
   */
  private async flushBuffer(): Promise<void> {
    if (this.logBuffer.length === 0) {
      return;
    }

    try {
      await fs.appendFile(
        this.filePath,
        this.logBuffer.join("\n") + "\n",
        "utf8"
      );
      this.logBuffer = [];
      this.bufferSize = 0;
    } catch (error) {
      console.error(`Error flushing log buffer to file:`, error);
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
    if (this.filePath.endsWith(".json")) {
      // Additional logic for JSON formatting could be implemented here
      return JSON.stringify({
        level,
        message,
        timestamp: new Date().toISOString(),
        ...context,
      });
    } else {
      const contextString = context
        ? Object.keys(context)
            .map((key) => `${key}: ${context[key]}`)
            .join(", ")
        : "";
      return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message} {${contextString}}`;
    }
  }

  /**
   * Ensures the buffer is flushed to the file before the FileTransport instance is disposed.
   */
  async dispose(): Promise<void> {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    await this.flushBuffer();
  }
}
