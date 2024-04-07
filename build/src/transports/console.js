"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleTransport = void 0;
const formatter_1 = require("../utils/formatter");
/**
 * ConsoleTransport - class for outputting logs to the console.
 */
class ConsoleTransport {
    /**
     * Prints a log message to the console.
     * @param message - Log message.
     * @param level - Logging level (for example, 'info', 'error').
     */
    log(message, level = "info") {
        const formattedMessage = (0, formatter_1.formatMessage)(message, level);
        switch (level) {
            case "error":
                console.error(formattedMessage);
                break;
            case "warn":
                console.warn(formattedMessage);
                break;
            case "debug":
                console.debug(formattedMessage);
                break;
            default:
                console.log(formattedMessage);
        }
    }
}
exports.ConsoleTransport = ConsoleTransport;
