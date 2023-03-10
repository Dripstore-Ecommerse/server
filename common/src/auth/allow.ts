import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors";
import { IRequestAuth } from "./RequestUser";

export const allow = function allow(
  roles: Array<string>
): (req: Request, res: Response, next: NextFunction) => void {
  return function (req: IRequestAuth, res: Response, next: NextFunction) {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Unauthorized route access!"));
    }
    next();
  };
};
