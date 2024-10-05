import express, { RequestHandler } from "express";
import authController from "../controllers/auth";
import BorrowController from "../controllers/borrowBooks";
import Authorization from "../middleware/Authorization";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication operations
 *   - name: Borrowing
 *     description: Borrowing operations
 */

/**
 * @swagger
 * /api/v1/login:  
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: M001
 *               name:
 *                 type: string
 *                 example: Angga
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Failed to login
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/v1/register:  
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: JHN-1
 *               name:
 *                 type: string
 *                 example: John
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Failed to register
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/v1/user:  
 *   get:
 *     summary: Get user details
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User details fetched
 *       401:
 *         description: Failed to get user
 */
router.get("/user", Authorization, authController.getUser);

/**
 * @swagger
 * /api/v1/all:  
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Users fetched
 *       401:
 *         description: Failed to get all member
 */
router.get("/all", Authorization, authController.getAll);

/**
 * @swagger
 * /api/v1/logout:  
 *   delete:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful logout
 *       401:
 *         description: Failed to logout
 */
router.delete("/logout", Authorization, authController.logout);

/**
 * @swagger
 * /api/v1/borrow:  
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookCode:
 *                 type: string
 *                 example: HOB-83
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/borrow", Authorization, BorrowController.borrowBooks);

/**
 * @swagger
 * /api/v1/return:  
 *   post:
 *     summary: Return a book
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookCode:
 *                 type: string
 *                 example: HOB-83
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/return", Authorization, BorrowController.returnBooks);

/**
 * @swagger
 * /api/v1/checkbooks:  
 *   get:
 *     summary: Check available books
 *     tags: [Borrowing]
 *     parameters:
 *       - in: query
 *         name: bookCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The code of the book to check
 *     responses:
 *       200:
 *         description: Books checked
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get("/checkbooks", Authorization, BorrowController.checkBooks);

/**
 * @swagger
 * /api/v1/checkmember:  
 *   get:
 *     summary: Check member status
 *     tags: [Borrowing]
 *     parameters:
 *       - in: query
 *         name: memberCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The code of the member to check
 *     responses:
 *       200:
 *         description: Member status checked
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get("/checkmember", Authorization, BorrowController.memberCheck);

export default router;
