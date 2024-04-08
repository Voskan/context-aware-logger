/**
 * A type that describes the structure of the log context.
 */
export interface LogContext {
  timestamp?: string;
  correlationId?: string;
  [key: string]: any;
}

/**
 * Generates a basic log context.
 * @param correlationId Optional correlation Id
 * @returns Basic log context.
 */
export function generateBaseContext(correlationId?: string): LogContext {
  const baseContext: any = {
    timestamp: new Date().toISOString(),
  };

  if (correlationId) baseContext[correlationId] = correlationId;

  return baseContext;
}

/**
 * Enriches the log context with user data.
 * @param context The base or current log context.
 * @param additionalContext Additional data to add to the context.
 * @returns Extended log context.
 */
export function enrichContext(
  context: LogContext,
  additionalContext: LogContext
): LogContext {
  return { ...context, ...additionalContext };
}
