import { LoggerTransport, LogContext } from "./utils/types";
/**
 * Main logger class.
 */
declare class Logger {
    private transports;
    /**
     * Adds a transport to the list of logger transports.
     * @param transport Transport to add.
     */
    addTransport(transport: LoggerTransport): void;
    /**
     * Logs a message at a given level with a given context.
     * @param level Logging level.
     * @param message Logging message.
     * @param context Additional context (optional).
     */
    private log;
    debug(message: string, context?: LogContext): void;
    info(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    error(message: string, context?: LogContext): void;
}
export { Logger };
