/**
 * A type that describes the structure of the log context.
 */
export interface LogContext {
    timestamp?: string;
    [key: string]: any;
}
/**
 * Generates a basic log context.
 * @returns Basic log context.
 */
export declare function generateBaseContext(): LogContext;
/**
 * Enriches the log context with user data.
 * @param context The base or current log context.
 * @param additionalContext Additional data to add to the context.
 * @returns Extended log context.
 */
export declare function enrichContext(context: LogContext, additionalContext: LogContext): LogContext;
