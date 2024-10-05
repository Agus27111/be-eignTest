import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        code: string;
        username: string;
      };
    }
  }
}
