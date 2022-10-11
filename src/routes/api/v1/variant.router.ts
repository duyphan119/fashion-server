import { Router } from "express";
import variantController from "../../../controllers/variant.controller";
import authMiddleware from "../../../middlewares/auth.middleware";
const variantRouter = Router();

variantRouter.post("/", authMiddleware.isAdmin, variantController.create);

variantRouter.get("/:id", variantController.getById);
variantRouter.get("/", variantController.getAll);

variantRouter.patch("/:id", authMiddleware.isAdmin, variantController.update);

variantRouter.delete("/:id", authMiddleware.isAdmin, variantController.deleteById);
variantRouter.delete("/", authMiddleware.isAdmin, variantController.deleteByIds);

export default variantRouter;
