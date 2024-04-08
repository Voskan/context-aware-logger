"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticsearchTransport = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
/**
 * ElasticsearchTransport - class for sending logs to Elasticsearch
 */
class ElasticsearchTransport {
    /**
     * Creates an ElasticsearchTransport instance.
     * @param elasticsearchConfig - Client Options
     */
    constructor(elasticsearchConfig) {
        this.client = new elasticsearch_1.Client(elasticsearchConfig);
    }
    /**
     * Asynchronously sends the log to the Elasticsearch server.
     * @param message - The log message to write.
     * @param level - The severity level of the log message.
     * @param context - Optional context to include with the message.
     */
    log(message, level, context) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.index({
                index: "log-index",
                body: Object.assign(Object.assign({ message,
                    level }, context), { timestamp: new Date() }),
            });
        });
    }
}
exports.ElasticsearchTransport = ElasticsearchTransport;
