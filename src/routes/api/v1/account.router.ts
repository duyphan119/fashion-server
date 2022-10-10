import { Router } from "express";
import accountController from "../../../controllers/account.controller";
import authMiddleware from "../../../middlewares/auth.middleware";
const accountRouter = Router();

accountRouter.post("/", authMiddleware.isAdmin, accountController.create);

accountRouter.get("/:id", authMiddleware.isAdmin, accountController.getById);
accountRouter.get("/", authMiddleware.isAdmin, accountController.getAll);

accountRouter.patch("/:id", authMiddleware.isAdmin, accountController.update);

accountRouter.delete("/:id", authMiddleware.isAdmin, accountController.deleteById);
accountRouter.delete("/", authMiddleware.isAdmin, accountController.deleteByIds);

export default accountRouter;
