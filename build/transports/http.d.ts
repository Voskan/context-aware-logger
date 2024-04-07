import { LoggerTransport } from "../utils/types";
/**
 * HttpTransport - class for sending logs to a remote server via HTTP.
 */
export declare class HttpTransport implements LoggerTransport {
    private endpoint;
    private method;
    private headers;
    /**
     * Creates an HttpTransport instance.
     * @param endpoint - The endpoint URL for sending logs.
     * @param method - HTTP method for requests, default 'POST'.
     * @param headers - Request headers.
     */
    constructor(endpoint: string, method?: string, headers?: Record<string, string>);
    /**
     * Asynchronously sends the log to the server.
     * @param message - Log message.
     * @param level - Log level
     */
    log(message: string, level: string): Promise<void>;
}
