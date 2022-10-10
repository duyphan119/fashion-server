import { Router } from "express";
import categoryController from "../../../controllers/category.controller";
import authMiddleware from "../../../middlewares/auth.middleware";
const categoryRouter = Router();

// categoryRouter.post("/", authMiddleware.isAdmin, categoryController.create);

// categoryRouter.get("/:id", authMiddleware.isAdmin, categoryController.getById);
// categoryRouter.get("/", authMiddleware.isAdmin, categoryController.getAll);

// categoryRouter.patch("/:id", authMiddleware.isAdmin, categoryController.update);

// categoryRouter.delete("/:id", authMiddleware.isAdmin, categoryController.deleteById);
// categoryRouter.delete("/", authMiddleware.isAdmin, categoryController.deleteByIds);

categoryRouter.post("/", categoryController.create);

categoryRouter.get("/:id", categoryController.getById);
categoryRouter.get("/", categoryController.getAll);

categoryRouter.patch("/:id", categoryController.update);

categoryRouter.delete("/:id", categoryController.deleteById);
categoryRouter.delete("/", categoryController.deleteByIds);

export default categoryRouter;
