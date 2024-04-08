import { Client, ClientOptions } from "@elastic/elasticsearch";
import { LoggerTransport } from "../utils/types";

/**
 * ElasticsearchTransport - class for sending logs to Elasticsearch
 */
export class ElasticsearchTransport implements LoggerTransport {
  private client: Client;

  /**
   * Creates an ElasticsearchTransport instance.
   * @param elasticsearchConfig - Client Options
   */
  constructor(elasticsearchConfig: ClientOptions) {
    this.client = new Client(elasticsearchConfig);
  }

  /**
   * Asynchronously sends the log to the Elasticsearch server.
   * @param message - The log message to write.
   * @param level - The severity level of the log message.
   * @param context - Optional context to include with the message.
   */
  async log(message: string, level: string, context?: any): Promise<void> {
    await this.client.index({
      index: "log-index",
      body: {
        message,
        level,
        ...context,
        timestamp: new Date(),
      },
    });
  }
}
