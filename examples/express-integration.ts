import express from "express";
import { Logger, ConsoleTransport, FileTransport } from "../src/index";

const logger = new Logger();
logger.addTransport(new ConsoleTransport());
logger.addTransport(new FileTransport("./logs/express-app.log"));

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
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

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use((err, req, res, next) => {
  logger.error("Unhandled exception", { error: err.message });
  res.status(500).send("Something went wrong");
});

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
