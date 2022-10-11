import { Router } from "express";
import productController from "../../../controllers/product.controller";
import authMiddleware from "../../../middlewares/auth.middleware";
const productRouter = Router();

productRouter.post("/", authMiddleware.isAdmin, productController.create);

productRouter.get("/:id", productController.getById);
productRouter.get("/", productController.getAll);

productRouter.patch("/:id", authMiddleware.isAdmin, productController.update);

productRouter.delete("/:id", authMiddleware.isAdmin, productController.deleteById);
productRouter.delete("/", authMiddleware.isAdmin, productController.deleteByIds);

export default productRouter;
