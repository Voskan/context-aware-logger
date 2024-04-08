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
 * Implements a logging transport that writes logs to a file. Supports writing
 * in different formats based on the file extension, including plain text and JSON.
 */
class FileTransport {
    /**
     * Creates a FileTransport instance.
     * @param filePath - Path to the file where logs will be written.
     */
    constructor(filePath) {
        this.filePath = filePath;
    }
    /**
     * Writes a log message to the file, formatted according to the file's extension.
     * @param message - The log message to write.
     * @param level - The severity level of the log message.
     * @param context - Optional context to include with the message.
     */
    log(message, level, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const formattedMessage = this.formatMessageForFile(message, level, context);
            try {
                yield this.appendLogToFile(formattedMessage);
            }
            catch (error) {
                console.error(`Error writing to log file:`, error);
            }
        });
    }
    /**
     * Appends a formatted log message to the file. For JSON files, ensures that
     * the logs are stored as an array of log objects.
     * @param message - The formatted log message to append.
     */
    appendLogToFile(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileExtension = this.filePath.split(".").pop();
                if (fileExtension === "json") {
                    // Check if the file exists and is not empty
                    let stats;
                    try {
                        stats = yield fs_1.promises.stat(this.filePath);
                    }
                    catch (error) {
                        if (error.code !== "ENOENT")
                            throw error; // Ignore errors other than "file does not exist"
                    }
                    if (stats && stats.size > 0) {
                        // Remove the last character (presumably `]`) before appending a new object
                        yield fs_1.promises.truncate(this.filePath, stats.size - 1);
                        // Append the new log object, preceded by a comma if the file isn't empty
                        yield fs_1.promises.appendFile(this.filePath, `,${message}]`, "utf8");
                    }
                    else {
                        // Start a new array with the log object if the file is empty
                        yield fs_1.promises.writeFile(this.filePath, `[${message}]`, "utf8");
                    }
                }
                else {
                    // For non-JSON files, simply append the message
                    yield fs_1.promises.appendFile(this.filePath, message + "\n", "utf8");
                }
            }
            catch (error) {
                console.error(`Error appending to log file:`, error);
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
        const fileExtension = this.filePath.split(".").pop();
        if (fileExtension === "json") {
            // Format as a JSON object for JSON files
            return JSON.stringify(Object.assign({ level,
                message, timestamp: new Date().toISOString() }, context));
        }
        else {
            // Format as a plain text string for other file types
            const contextString = context
                ? Object.keys(context)
                    .map((key) => `${key}: ${context[key]}`)
                    .join(", ")
                : "";
            return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message} {${contextString}}`;
        }
    }
}
exports.FileTransport = FileTransport;
