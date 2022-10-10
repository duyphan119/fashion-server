import { Router } from "express";
import accountRouter from "./account.router";
import authRouter from "./auth.router";
const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/account", accountRouter);

export default v1Router;
