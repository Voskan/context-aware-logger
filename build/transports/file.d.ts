import { LoggerTransport } from "../utils/types";
/**
 * FileTransport - class for writing logs to a file.
 */
export declare class FileTransport implements LoggerTransport {
    private filePath;
    /**
     * Creates a FileTransport instance.
     * @param filePath - Path to the file where logs will be written.
     */
    constructor(filePath: string);
    /**
     * Asynchronously writes a log message to a file, ensuring the file is created if it does not exist.
     * @param message - Log message.
     * @param level - Log level
     */
    log(message: string, level: string): Promise<void>;
}
