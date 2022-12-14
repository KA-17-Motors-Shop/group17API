import express, { Express } from "express";
import cors from "cors";
import "express-async-errors";

import errorHandler from "./middlewares/handlerErrors.middleware";
import addressRouter from "./routes/address/index.routes";
import announcementRouter from "./routes/announcement/index.routes";
import bidsRouter from "./routes/bids/index.routes";
import userRoutes from "./routes/user/index.routes";
import commentsRouter from "./routes/comments/index.routes";
import purchasesRouter from "./routes/purchases/index.routes";

const app: Express = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/users", userRoutes);
app.use("/address", addressRouter);
app.use("/announcement", announcementRouter);
app.use("/purchases", purchasesRouter);
app.use("/bids", bidsRouter);
app.use("/comment", commentsRouter);

app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("Hello"));

app.use(errorHandler);

export default app;
