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
exports.createLoggerMiddleware = void 0;
const uuid_1 = require("uuid");
/**
 * Function for creating middleware compatible with Express/Koa/Fastify.
 * @param logger
 * @returns Middleware function.
 */
function createLoggerMiddleware(logger) {
    return function loggerMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = Date.now();
            const correlationId = req.headers["x-correlation-id"] || (0, uuid_1.v4)();
            req.correlationId = correlationId;
            logger.info(`Incoming request: ${req.method} ${req.url || req.path}`);
            function logResponse() {
                const duration = Date.now() - start;
                logger.info(`Request processed: ${req.method} ${req.url || req.path} - ${res.statusCode} [${duration}ms]`);
            }
            req.log = (message) => {
                logger.info(message, { correlationId });
            };
            res.on("finish", logResponse);
            res.on("close", () => {
                logger.warn(`Request terminated prematurely: ${req.method} ${req.url || req.path}`);
            });
            res.on("error", (error) => {
                logger.error(`Response error: ${req.method} ${req.url || req.path} - Error: ${error.message}`);
            });
            try {
                if (next) {
                    next();
                }
            }
            catch (error) {
                logger.error(`Request processing error: ${req.method} ${req.url || req.path} - Error: ${error.message}`);
                if (typeof next === "function") {
                    next(error);
                }
            }
        });
    };
}
exports.createLoggerMiddleware = createLoggerMiddleware;
