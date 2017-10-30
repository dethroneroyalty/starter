import winston from "winston";

export default function setLogger(app) {
  const logger = new winston.Logger({
    transports: [
      new winston.transports.Console({ level: process.env.LOGLEVEL || "info" })
    ]
  });
  app.set("logger", logger);
}
