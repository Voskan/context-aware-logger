import { LoggerTransport, LogContext, LogLevel } from "../utils/types";
/**
 * FileTransport is responsible for writing log messages to a file.
 * It supports buffering to optimize disk I/O operations.
 */
export declare class FileTransport implements LoggerTransport {
    private filePath;
    private logBuffer;
    private bufferSize;
    private maxBufferSize;
    private flushInterval;
    private flushTimer;
    /**
     * Creates a FileTransport instance.
     * @param filePath - Path to the file where logs will be written.
     * @param maxBufferSize - Maximum size of the buffer in bytes before flushing to the file.
     * @param flushInterval - Time interval in milliseconds for flushing the buffer to the file.
     */
    constructor(filePath: string, maxBufferSize?: number, flushInterval?: number);
    /**
     * Writes a log message to the buffer. Flushes the buffer to the file if it exceeds the maxBufferSize or
     * according to the flushInterval.
     * @param message - The log message to write.
     * @param level - The severity level of the log message.
     * @param context - Optional context to include with the message.
     */
    log(message: string, level: LogLevel, context?: LogContext): Promise<void>;
    /**
     * Starts a timer to flush the buffer to the file at regular intervals defined by flushInterval.
     */
    private startFlushTimer;
    /**
     * Flushes the buffer to the file and clears it. Used both when the buffer is full and at regular flush intervals.
     */
    private flushBuffer;
    /**
     * Formats a log message for writing to the file, adjusting the format based on the file's extension.
     * @param message - The log message to format.
     * @param level - The severity level of the log message.
     * @param context - Optional context to include with the message.
     * @returns The formatted log message.
     */
    private formatMessageForFile;
    /**
     * Ensures the buffer is flushed to the file before the FileTransport instance is disposed.
     */
    dispose(): Promise<void>;
}
