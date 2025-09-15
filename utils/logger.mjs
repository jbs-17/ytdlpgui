import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, label, prettyPrint } = format;


// //format
//console
const consoleFormat = format.combine()


// // transports
// comsole
const consoleTranport = new winston.transports.Console({
  level: 'debug'
});
// rotate file





// logger uyama
const logger = winston.createLogger({
  transports: [
  ]
});

// Tangani error global
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection", { reason });
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", { error: err.stack || err.message });
  process.exit(1);
});

export default logger;
