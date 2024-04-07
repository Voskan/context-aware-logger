import { LoggerTransport, LogLevel } from "../utils/types";
/**
 * ConsoleTransport - class for outputting logs to the console.
 */
export declare class ConsoleTransport implements LoggerTransport {
    /**
     * Prints a log message to the console.
     * @param message - Log message.
     * @param level - Logging level (for example, 'info', 'error').
     */
    log(message: string, level?: LogLevel): void;
}
