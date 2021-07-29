import { NextFunction, Request, Response } from "express";
import { ErrorRequest } from "../classes/ErrorRequest";

export function errorsMiddleware(
  error: ErrorRequest,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof ErrorRequest) {
    return response.status(error.statusCode).json({ error: error.message });
  }
  console.log(error);
  return response.status(500).json({
    status: "error",
    error: "Internal Server Error",
  });
}
