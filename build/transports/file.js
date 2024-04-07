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
const formatter_1 = require("../utils/formatter");
/**
 * FileTransport - class for writing logs to a file.
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
     * Asynchronously writes a log message to a file, ensuring the file is created if it does not exist.
     * @param message - Log message.
     * @param level - Log level
     */
    log(message, level) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formattedMessage = (0, formatter_1.formatMessage)(message, level);
                // Ensure the file is opened for appending, which creates the file if it does not exist.
                const fileHandle = yield fs_1.promises.open(this.filePath, "a");
                yield fs_1.promises.appendFile(fileHandle, formattedMessage + "\n", "utf8");
                // It's important to close the file handle after operations are complete to free up resources.
                yield fileHandle.close();
            }
            catch (error) {
                console.error(`Error writing to log file:`, error);
            }
        });
    }
}
exports.FileTransport = FileTransport;
