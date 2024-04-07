import { LoggerTransport } from "../utils/types";
import fetch from "node-fetch";

/**
 * HttpTransport - class for sending logs to a remote server via HTTP.
 */
export class HttpTransport implements LoggerTransport {
  private endpoint: string;
  private method: string;
  private headers: Record<string, string>;

  /**
   * Creates an HttpTransport instance.
   * @param endpoint - The endpoint URL for sending logs.
   * @param method - HTTP method for requests, default 'POST'.
   * @param headers - Request headers.
   */
  constructor(
    endpoint: string,
    method: string = "POST",
    headers: Record<string, string> = { "Content-Type": "application/json" }
  ) {
    this.endpoint = endpoint;
    this.method = method;
    this.headers = headers;
  }

  /**
   * Asynchronously sends the log to the server.
   * @param message - Log message.
   * @param level - Log level
   */
  async log(message: string, level: string): Promise<void> {
    try {
      const response = await fetch(this.endpoint, {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify({ message, level }),
      });

      if (!response.ok) {
        console.error(
          `Failed to log to ${this.endpoint}: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(`Error logging to ${this.endpoint}:`, error);
    }
  }
}
