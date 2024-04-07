"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const context_1 = require("./utils/context");
const formatter_1 = require("./utils/formatter");
/**
 * Main logger class.
 */
class Logger {
    constructor() {
        this.transports = [];
    }
    /**
     * Adds a transport to the list of logger transports.
     * @param transport Transport to add.
     */
    addTransport(transport) {
        this.transports.push(transport);
    }
    /**
     * Logs a message at a given level with a given context.
     * @param level Logging level.
     * @param message Logging message.
     * @param context Additional context (optional).
     */
    log(level, message, context) {
        const baseContext = (0, context_1.generateBaseContext)();
        const fullContext = (0, context_1.enrichContext)(baseContext, context || {});
        const formattedMessage = (0, formatter_1.formatMessage)(message, level, fullContext);
        this.transports.forEach((transport) => {
            transport.log(formattedMessage, level, fullContext);
        });
    }
    debug(message, context) {
        this.log("debug", message, context);
    }
    info(message, context) {
        this.log("info", message, context);
    }
    warn(message, context) {
        this.log("warn", message, context);
    }
    error(message, context) {
        this.log("error", message, context);
    }
}
exports.Logger = Logger;
