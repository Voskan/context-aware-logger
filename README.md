# Context-Aware Logger

A flexible and context-aware logging module for Node.js applications, providing powerful logging capabilities with enriched context information like timestamps, request IDs, and custom data. Supports multiple transports including console, file, and HTTP, making it ideal for both development and production environments.

## Features

- **Context-Aware Logging**: Automatically enriches logs with contextual information, including timestamps, file names, line numbers, and custom data.
- **Multiple Transports**: Easily log messages to the console, files, or via HTTP to a remote logging service.
- **Buffered File Logging**: Enhances performance by buffering log messages and writing them in batches to the disk.
- **Framework Integration**: Offers easy integration with popular frameworks like Express.js, Koa, Fastify, NestJS, etc.
- **Flexible and Configurable**: Configure log levels, message formats, and more to suit your needs.
- **TypeScript Support**: Fully typed for TypeScript users for a better development experience.

## Installation

Install `@voskan/context-aware-logger` using npm or yarn:

```bash
npm install @voskan/context-aware-logger
```

## Advanced Usage Examples

This section covers more advanced usage scenarios, including using different transports and integrating the logger with various Node.js frameworks.

### Using Different Transports

### File Transport

The FileTransport allows logging messages to a file in various popular formats, including plain text **.log** files and structured .**json** files. It also supports buffered writing for improved performance.

To configure FileTransport with buffering:

```typescript
import { Logger, FileTransport } from "@voskan/context-aware-logger";

const logger = new Logger();
// For plain text logs
const fileTransport = new FileTransport("./logs/app.log", 1024 * 50, 10000); // Buffer size of 50KB and flush every 10 seconds
// For JSON formatted logs
logger.addTransport(new FileTransport("./logs/app.json")); // Default: Buffer size of 10KB and flush every 5 seconds

logger.info("Logging message to a file");
```

#### Parameters:

- **filePath**: Path to the log file.
- **maxBufferSize**: Maximum buffer size in bytes before flushing to the file. Default is 10KB.
- **flushInterval**: Time in milliseconds to flush the buffer to the file periodically. Default is 5000ms (5 seconds).

### HTTP Transport

To send log messages to a remote logging service:

```typescript
import { Logger, HttpTransport } from "@voskan/context-aware-logger";

const logger = new Logger();
logger.addTransport(new HttpTransport("http://your-logging-endpoint.com/logs"));

logger.error("Sending an error log to the remote server");
```

## Framework Integrations

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

## Universal Logger Middleware

The @voskan/context-aware-logger package also includes a universal middleware that can be integrated with various Node.js web frameworks to automatically log requests and responses. This middleware enriches the logs with request details and supports logging for different transports based on your configuration.

### Creating the Middleware

First, ensure you have created a logger instance and added your desired transports (console, file, HTTP, etc.).

```typescript
import {
  Logger,
  ConsoleTransport,
  FileTransport,
} from "@voskan/context-aware-logger";

const logger = new Logger();
logger.addTransport(new ConsoleTransport());
logger.addTransport(new FileTransport("./logs/app.log"));
```

### Integrating with Web Frameworks

Below are examples of how to integrate the logging middleware into different Node.js frameworks.

#### Express

```typescript
import express from "express";
import { createLoggerMiddleware } from "@voskan/context-aware-logger";

const app = express();
app.use(createLoggerMiddleware(logger));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Server started on port 3000"));
```

#### Koa

For Koa, wrap the middleware to adapt it to Koa's middleware signature.

```typescript
import Koa from "koa";
import { createLoggerMiddleware } from "@voskan/context-aware-logger";

const app = new Koa();

// Koa middleware adapter
app.use((ctx, next) =>
  createLoggerMiddleware(logger)(ctx.request, ctx.response, next)
);

app.use((ctx) => (ctx.body = "Hello Koa"));

app.listen(3000, () => console.log("Koa server started on port 3000"));
```

#### Fastify

For Fastify, use the middleware within a hook or a plugin.

```typescript
import Fastify from "fastify";
import { createLoggerMiddleware } from "@voskan/context-aware-logger";

const fastify = Fastify();

fastify.addHook("onRequest", async (request, reply) =>
  createLoggerMiddleware(logger)(request.raw, reply.raw, () => {})
);

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.listen(3000, (err) => {
  if (err) throw err;
  console.log("Server listening on port 3000");
});
```

### Error Handling

The middleware automatically logs request and response information. To log errors, ensure you have error-handling middleware set up in your application that logs the errors using the same logger instance.

#

These examples showcase how @voskan/context-aware-logger can be easily integrated into applications built with Fastify, NestJS, Express.js and Koa, providing consistent and flexible logging capabilities across different Node.js frameworks.
