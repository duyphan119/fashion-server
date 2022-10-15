import { Router } from "express";
import productImageController from "../../../controllers/product-image.controller";
import authMiddleware from "../../../middlewares/auth.middleware";
const productImageRouter = Router();

productImageRouter.post("/", authMiddleware.isAdmin, productImageController.create);

productImageRouter.get("/:id", productImageController.getById);
productImageRouter.get("/", productImageController.getAll);

productImageRouter.patch("/:id", authMiddleware.isAdmin, productImageController.update);

productImageRouter.delete("/:id", authMiddleware.isAdmin, productImageController.deleteById);
productImageRouter.delete("/", authMiddleware.isAdmin, productImageController.deleteByIds);

export default productImageRouter;
