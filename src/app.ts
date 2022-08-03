import express, { Express } from "express";
import "express-async-errors";

import errorHandler from "./middlewares/handlerErrors.middleware";
import userRoutes from "./routes/user/index.routes";

const app: Express = express();

app.use(express.json());

app.use("/users", userRoutes);

app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("Hello"));

app.use(errorHandler);

export default app;
