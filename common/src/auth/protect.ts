import { IRequestAuth } from "./RequestUser";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { ApiError } from "../errors";

const JWT_SECRET = "98awes$34ds5bg$#h45gb43%w98hg3w@84weg";

export const protect = function protect(
  req: IRequestAuth,
  res: Response,
  next: NextFunction
): void {
  let token = "";
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization?.split(" ")[1];
  }
  if (!token) return next(new ApiError(401, "Please login to get access."));

  const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
  console.log("payload", payload);
  req.user = payload;
  next();
};
