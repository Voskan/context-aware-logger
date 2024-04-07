import { Logger } from "../logger";
/**
 * Function for creating middleware compatible with Express/Koa/Fastify.
 * @param logger
 * @returns Middleware function.
 */
export declare function createLoggerMiddleware(logger: Logger): (req: any, res: any, next?: any) => Promise<void>;
