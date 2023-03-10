import winston from "winston";
const ENVIRONMENT = process.env.APP_ENV || "development";

interface LoggingInfo {
  level: string;
  message: string;
}

const enumerateErrorFormat = winston.format((info: LoggingInfo) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: ENVIRONMENT === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    ENVIRONMENT === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(
      (info: LoggingInfo) => `${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

export default logger;
