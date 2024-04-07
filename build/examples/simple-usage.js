"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const logger = new index_1.Logger();
logger.addTransport(new index_1.ConsoleTransport());
// Write to file
logger.addTransport(new index_1.FileTransport("./logs/simple-usage.log"));
// Sending logs to a remote server (example URL, in reality use your own)
logger.addTransport(new index_1.HttpTransport("http://localhost:3000/log"));
logger.debug("Debug message: More detailed information for debugging.");
logger.info("Info message: General informational messages.");
logger.warn("Warning message: Something unexpected but not serious.");
logger.error("Error message: Something went wrong!");
console.log("Check your console, file, and possibly your HTTP endpoint for the logged messages.");
