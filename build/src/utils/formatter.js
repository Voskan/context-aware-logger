"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMessage = void 0;
/**
 * Formats a log message by adding contextual information to it.
 * This version simplifies the output and focuses on readability.
 * @param message Log message.
 * @param level Logging level.
 * @param context Additional context for the log.
 * @returns Formatted log message.
 */
function formatMessage(message, level, context) {
    // Ensure timestamp is always present
    const timestamp = (context === null || context === void 0 ? void 0 : context.timestamp) || new Date().toISOString();
    // Prepare additional context excluding the timestamp and level for cleaner output
    const additionalContext = Object.assign({}, context);
    delete additionalContext.timestamp;
    delete additionalContext.level;
    // Convert additional context to a string only if it's not empty
    let contextString = "";
    const keys = Object.keys(additionalContext);
    if (keys.length > 0) {
        contextString = keys
            .map((key) => `${key}: ${additionalContext[key]}`)
            .join(", ");
        contextString = ` {${contextString}}`;
    }
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextString}`;
}
exports.formatMessage = formatMessage;
