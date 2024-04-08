"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrichContext = exports.generateBaseContext = void 0;
/**
 * Generates a basic log context.
 * @param correlationId Optional correlation Id
 * @returns Basic log context.
 */
function generateBaseContext(correlationId) {
    return {
        timestamp: new Date().toISOString(),
        correlationId: correlationId ? correlationId : "",
    };
}
exports.generateBaseContext = generateBaseContext;
/**
 * Enriches the log context with user data.
 * @param context The base or current log context.
 * @param additionalContext Additional data to add to the context.
 * @returns Extended log context.
 */
function enrichContext(context, additionalContext) {
    return Object.assign(Object.assign({}, context), additionalContext);
}
exports.enrichContext = enrichContext;
