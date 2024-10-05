import { Options } from "swagger-jsdoc";

export const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API + TypeScript + Sequelize",
      version: "1.0.0",
      description: "A simple Express API for Book Borrowing Application",
    },
  },
  apis: ["./src/**/*.ts"],
};
