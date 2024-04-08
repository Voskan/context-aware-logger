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
exports.FileTransport = void 0;
const fs_1 = require("fs");
/**
 * FileTransport is responsible for writing log messages to a file.
 * It supports buffering to optimize disk I/O operations.
 */
class FileTransport {
    /**
     * Creates a FileTransport instance.
     * @param filePath - Path to the file where logs will be written.
     * @param maxBufferSize - Maximum size of the buffer in bytes before flushing to the file.
     * @param flushInterval - Time interval in milliseconds for flushing the buffer to the file.
     */
    constructor(filePath, maxBufferSize = 1024 * 10, flushInterval = 5000) {
        this.logBuffer = [];
        this.bufferSize = 0;
        this.flushTimer = null;
        this.filePath = filePath;
        this.maxBufferSize = maxBufferSize;
        this.flushInterval = flushInterval;
        this.startFlushTimer();
    }
    /**
     * Writes a log message to the buffer. Flushes the buffer to the file if it exceeds the maxBufferSize or
     * according to the flushInterval.
     * @param message - The log message to write.
     * @param level - The severity level of the log message.
     * @param context - Optional context to include with the message.
     */
    log(message, level, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const formattedMessage = this.formatMessageForFile(message, level, context);
            this.logBuffer.push(formattedMessage);
            this.bufferSize += Buffer.byteLength(formattedMessage, "utf8");
            if (this.bufferSize >= this.maxBufferSize) {
                yield this.flushBuffer();
            }
        });
    }
    /**
     * Starts a timer to flush the buffer to the file at regular intervals defined by flushInterval.
     */
    startFlushTimer() {
        this.flushTimer = setInterval(() => {
            this.flushBuffer().catch(console.error);
        }, this.flushInterval);
    }
    /**
     * Flushes the buffer to the file and clears it. Used both when the buffer is full and at regular flush intervals.
     */
    flushBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.logBuffer.length === 0) {
                return;
            }
            try {
                yield fs_1.promises.appendFile(this.filePath, this.logBuffer.join("\n") + "\n", "utf8");
                this.logBuffer = [];
                this.bufferSize = 0;
            }
            catch (error) {
                console.error(`Error flushing log buffer to file:`, error);
            }
        });
    }
    /**
     * Formats a log message for writing to the file, adjusting the format based on the file's extension.
     * @param message - The log message to format.
     * @param level - The severity level of the log message.
     * @param context - Optional context to include with the message.
     * @returns The formatted log message.
     */
    formatMessageForFile(message, level, context) {
        if (this.filePath.endsWith(".json")) {
            // Additional logic for JSON formatting could be implemented here
            return JSON.stringify(Object.assign({ level,
                message, timestamp: new Date().toISOString() }, context));
        }
        else {
            const contextString = context
                ? Object.keys(context)
                    .map((key) => `${key}: ${context[key]}`)
                    .join(", ")
                : "";
            return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message} {${contextString}}`;
        }
    }
    /**
     * Ensures the buffer is flushed to the file before the FileTransport instance is disposed.
     */
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.flushTimer) {
                clearInterval(this.flushTimer);
            }
            yield this.flushBuffer();
        });
    }
}
exports.FileTransport = FileTransport;
