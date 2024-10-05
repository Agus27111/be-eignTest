import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import router from "./routes/Routes";
dotenv.config();

// SWAGGER
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "../src/config/swagger";

const swaggerDocs = swaggerJsdoc(options);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Public Route
app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    response: "Express TypeScript",
  });
});

// Apply authentication middleware before routes requiring authentication
app.use("/api/v1", router); 

app.listen(process.env.APP_PORT, () => {
  console.log(
    `${process.env.APP_NAME} running on port ${process.env.APP_PORT}`
  );
});
