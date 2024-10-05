import { Request, Response, NextFunction } from "express";
import Helper from "../helpers/Helper";
import { UserData } from "../types/UserData";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

const Authorization = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized, no token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized, no token provided",
      });
    }

    const decoded = Helper.ExtractToken(token);
    console.log("🚀 ~ decoded:", decoded);

    if (!decoded) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unauthorized", null, null));
    }

    req.user = decoded as unknown as UserData;
    console.log("🚀 ~  req.user:",  req.user)
    

    next();
  } catch (err: any) {
    return res.status(500).send(Helper.ResponseData(500, "", err, null));
  }
};

export default Authorization;
