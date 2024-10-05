import express, { RequestHandler } from "express";
import authController from "../controllers/auth";
import BorrowController from "../controllers/borrowBooks";
import { ParsedQs } from "qs";
import Authorization from "../middleware/Authorization";
import { ParamsDictionary } from "express-serve-static-core";

const router = express.Router();

//auth Route
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/user", Authorization, authController.getUser);
router.get("/all", Authorization, authController.getAll);
router.delete("/logout", Authorization, authController.logout);

//borrow route
router.post("/borrow", Authorization, BorrowController.borrowBooks);
router.post("/return", Authorization, BorrowController.returnBooks);
router.get("/checkbooks", Authorization, BorrowController.checkBooks);
router.get("/checkmember", Authorization, BorrowController.memberCheck);

export default router;
