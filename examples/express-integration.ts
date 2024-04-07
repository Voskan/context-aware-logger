// import express from "express"; // install and import
import { Logger, ConsoleTransport, FileTransport } from "../src/index";

const logger = new Logger();
logger.addTransport(new ConsoleTransport());
logger.addTransport(new FileTransport("./logs/express-app.log"));

const app = {} as any; // const app = express() // - after install change this
const PORT = process.env.PORT || 3000;

app.use((req: any, res: any, next: any) => {
  const startTime = process.hrtime();

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const duration = seconds * 1000 + nanoseconds / 1e6;

    logger.info(
      `[${req.method}] ${req.originalUrl} ${res.statusCode} ${duration.toFixed(
        3
      )}ms`,
      {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration.toFixed(3)}ms`,
      }
    );
  });

  next();
});

app.get("/", (req: any, res: any, next: any) => {
  res.send("Hello, Express!");
});

app.use((err: any, req: any, res: any, next: any) => {
  logger.error("Unhandled exception", { error: err.message });
  res.status(500).send("Something went wrong");
});

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
