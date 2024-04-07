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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpTransport = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
/**
 * HttpTransport - class for sending logs to a remote server via HTTP.
 */
class HttpTransport {
    /**
     * Creates an HttpTransport instance.
     * @param endpoint - The endpoint URL for sending logs.
     * @param method - HTTP method for requests, default 'POST'.
     * @param headers - Request headers.
     */
    constructor(endpoint, method = "POST", headers = { "Content-Type": "application/json" }) {
        this.endpoint = endpoint;
        this.method = method;
        this.headers = headers;
    }
    /**
     * Asynchronously sends the log to the server.
     * @param message - Log message.
     * @param level - Log level
     */
    log(message, level) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, node_fetch_1.default)(this.endpoint, {
                    method: this.method,
                    headers: this.headers,
                    body: JSON.stringify({ message, level }),
                });
                if (!response.ok) {
                    console.error(`Failed to log to ${this.endpoint}: ${response.statusText}`);
                }
            }
            catch (error) {
                console.error(`Error logging to ${this.endpoint}:`, error);
            }
        });
    }
}
exports.HttpTransport = HttpTransport;
