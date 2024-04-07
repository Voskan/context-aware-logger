# @voskan/context-aware-logger

A flexible and context-aware logging module for Node.js applications, providing powerful logging capabilities with enriched context information like timestamps, request IDs, and custom data. Supports multiple transports including console, file, and HTTP, making it ideal for both development and production environments.

## Features

- **Context-Aware Logging**: Automatically enriches logs with contextual information, including timestamps, file names, line numbers, and custom data.
- **Multiple Transports**: Easily log messages to the console, files, or via HTTP to a remote logging service.
- **Framework Integration**: Offers easy integration with popular frameworks like Express, Koa, etc.
- **Flexible and Configurable**: Configure log levels, message formats, and more to suit your needs.
- **TypeScript Support**: Fully typed for TypeScript users for a better development experience.

## Installation

Install `@voskan/context-aware-logger` using npm:

```bash
npm install @voskan/context-aware-logger
```

## Advanced Usage Examples

This section covers more advanced usage scenarios, including using different transports and integrating the logger with various Node.js frameworks.

### Using Different Transports

#### File Transport

To log messages to a specific file:

```typescript
import { Logger, FileTransport } from "@voskan/context-aware-logger";

const logger = new Logger();
logger.addTransport(new FileTransport("./logs/app.log"));

logger.info("Logging message to a file");
```

### HTTP Transport

To send log messages to a remote logging service:

```typescript
import { Logger, HttpTransport } from "@voskan/context-aware-logger";

const logger = new Logger();
logger.addTransport(new HttpTransport("http://your-logging-endpoint.com/logs"));

logger.error("Sending an error log to the remote server");
```

### Framework Integrations

#### Express

Integrating with Express to log all incoming requests and errors:

```typescript
import express from "express";
import { Logger, ConsoleTransport } from "@voskan/context-aware-logger";

const app = express();
const logger = new Logger();
logger.addTransport(new ConsoleTransport());

// Log all requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error("Unhandled exception", { error: err });
  res.status(500).send("Internal Server Error");
});

app.listen(3000, () => logger.info("Server started on port 3000"));
```

#### Koa

For Koa, you can create a simple logging middleware to log each request:

```typescript
import Koa from "koa";
import { Logger, ConsoleTransport } from "@voskan/context-aware-logger";

const app = new Koa();
const logger = new Logger();
logger.addTransport(new ConsoleTransport());

app.use(async (ctx, next) => {
  await next();
  logger.info(`${ctx.method} ${ctx.url}`);
});

app.listen(3000, () => {
  logger.info("Koa server listening on port 3000");
});
```

#### Fastify

To integrate with Fastify and log all incoming requests:

```typescript
import Fastify from "fastify";
import { Logger, ConsoleTransport } from "@voskan/context-aware-logger;

const fastify = Fastify();
const logger = new Logger();
logger.addTransport(new ConsoleTransport());

fastify.addHook("onRequest", (request, reply, done) => {
  logger.info(`Incoming request: ${request.method} ${request.url}`);
  done();
});

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.listen(3000, (err, address) => {
  if (err) {
    logger.error("Error starting server:", { error: err });
    process.exit(1);
  }
  logger.info(`Server listening at ${address}`);
});
```

#### NestJS

Integrating with a NestJS application to log all requests and unhandled exceptions:

```typescript
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { Logger, ConsoleTransport } from "@voskan/context-aware-logger";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { Request, Response, NextFunction } from "express";

@Injectable()
class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();

  constructor() {
    this.logger.addTransport(new ConsoleTransport());
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`${req.method} ${req.path}`);
    next();
  }
}

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerMiddleware,
    },
  ],
})
class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
```

These examples showcase how @voskan/context-aware-logger can be easily integrated into applications built with Fastify NestJS, Express.js and Koa, providing consistent and flexible logging capabilities across different Node.js frameworks.
