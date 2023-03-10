import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import logger from "../logger/logger";
import ApiError from "./ApiError";
export const ENVIRONMENT = process.env.APP_ENV || "development";

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let { statusCode, message } = err;
  if (ENVIRONMENT === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = "Internal Server Error";
  }

  res.locals["errorMessage"] = err.message;

  const response = {
    code: statusCode,
    message,
    ...(ENVIRONMENT === "development" && { stack: err.stack }),
  };

  if (ENVIRONMENT === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
