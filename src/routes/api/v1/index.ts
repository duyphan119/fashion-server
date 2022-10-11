import { Router } from "express";
import accountRouter from "./account.router";
import authRouter from "./auth.router";
import categoryRouter from "./category.router";
import mediaRouter from "./media.router";
import productRouter from "./product.router";
import variantRouter from "./variant.router";
const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/account", accountRouter);
v1Router.use("/media", mediaRouter);
v1Router.use("/category", categoryRouter);
v1Router.use("/variant", variantRouter);
v1Router.use("/product", productRouter);

export default v1Router;
