import { LoggerTransport, LogContext, LogLevel } from "../utils/types";
/**
 * Implements a logging transport that writes logs to a file. Supports writing
 * in different formats based on the file extension, including plain text and JSON.
 */
export declare class FileTransport implements LoggerTransport {
    private filePath;
    /**
     * Creates a FileTransport instance.
     * @param filePath - Path to the file where logs will be written.
     */
    constructor(filePath: string);
    /**
     * Writes a log message to the file, formatted according to the file's extension.
     * @param message - The log message to write.
     * @param level - The severity level of the log message.
     * @param context - Optional context to include with the message.
     */
    log(message: string, level: LogLevel, context?: LogContext): Promise<void>;
    /**
     * Appends a formatted log message to the file. For JSON files, ensures that
     * the logs are stored as an array of log objects.
     * @param message - The formatted log message to append.
     */
    private appendLogToFile;
    /**
     * Formats a log message for writing to the file, adjusting the format based on the file's extension.
     * @param message - The log message to format.
     * @param level - The severity level of the log message.
     * @param context - Optional context to include with the message.
     * @returns The formatted log message.
     */
    private formatMessageForFile;
}
