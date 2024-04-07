import { Logger } from "../logger";

/**
 * Function for creating middleware compatible with Express/Koa/Fastify.
 * @param logger
 * @returns Middleware function.
 */
export function createLoggerMiddleware(logger: Logger) {
  return async function loggerMiddleware(req: any, res: any, next?: any) {
    const start = Date.now();

    logger.info(`Incoming request: ${req.method} ${req.url || req.path}`);

    function logResponse() {
      const duration = Date.now() - start;
      logger.info(
        `Request processed: ${req.method} ${req.url || req.path} - ${
          res.statusCode
        } [${duration}ms]`
      );
    }

    res.on("finish", logResponse);
    res.on("close", () => {
      logger.warn(
        `Request terminated prematurely: ${req.method} ${req.url || req.path}`
      );
    });
    res.on("error", (error: Error) => {
      logger.error(
        `Response error: ${req.method} ${req.url || req.path} - Error: ${
          error.message
        }`
      );
    });

    try {
      if (next) {
        next();
      }
    } catch (error: any) {
      logger.error(
        `Request processing error: ${req.method} ${
          req.url || req.path
        } - Error: ${error.message}`
      );
      if (typeof next === "function") {
        next(error);
      }
    }
  };
}
