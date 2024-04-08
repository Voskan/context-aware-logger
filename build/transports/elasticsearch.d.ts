import { ClientOptions } from "@elastic/elasticsearch";
import { LoggerTransport } from "../utils/types";
/**
 * ElasticsearchTransport - class for sending logs to Elasticsearch
 */
export declare class ElasticsearchTransport implements LoggerTransport {
    private client;
    /**
     * Creates an ElasticsearchTransport instance.
     * @param elasticsearchConfig - Client Options
     */
    constructor(elasticsearchConfig: ClientOptions);
    /**
     * Asynchronously sends the log to the Elasticsearch server.
     * @param message - The log message to write.
     * @param level - The severity level of the log message.
     * @param context - Optional context to include with the message.
     */
    log(message: string, level: string, context?: any): Promise<void>;
}
