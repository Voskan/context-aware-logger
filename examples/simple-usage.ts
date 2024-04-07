import {
  Logger,
  ConsoleTransport,
  FileTransport,
  HttpTransport,
} from "../src/index";

const logger = new Logger();

logger.addTransport(new ConsoleTransport());
// Write to file
logger.addTransport(new FileTransport("./logs/simple-usage.log"));
// Sending logs to a remote server (example URL, in reality use your own)
logger.addTransport(new HttpTransport("http://localhost:3000/log"));

logger.debug("Debug message: More detailed information for debugging.");
logger.info("Info message: General informational messages.");
logger.warn("Warning message: Something unexpected but not serious.");
logger.error("Error message: Something went wrong!");

console.log(
  "Check your console, file, and possibly your HTTP endpoint for the logged messages."
);
