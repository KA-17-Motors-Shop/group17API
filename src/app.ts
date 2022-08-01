import express, { Express } from "express";
import userRoutes from "./routes/user";

const app: Express = express();

app.use(express.json());

app.use("/users", userRoutes);

app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("Hello"));

export default app;
