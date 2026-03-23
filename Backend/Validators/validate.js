import { validationResult } from "express-validator";
import { errorResponse } from "../utils/response";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, 400, "Validation failed", errors.array());
  }

  next();
};
