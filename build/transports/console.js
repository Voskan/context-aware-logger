"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleTransport = void 0;
const formatter_1 = require("../utils/formatter");
const colors_1 = require("../utils/colors");
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
                console.error((0, colors_1.colorize)("red", formattedMessage));
                break;
            case "warn":
                console.warn((0, colors_1.colorize)("yellow", formattedMessage));
                break;
            case "info":
                console.log((0, colors_1.colorize)("blue", formattedMessage));
                break;
            case "debug":
                console.log((0, colors_1.colorize)("magenta", formattedMessage));
                break;
            default:
                console.log(formattedMessage);
        }
    }
}
exports.ConsoleTransport = ConsoleTransport;
