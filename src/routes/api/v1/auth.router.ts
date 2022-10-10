import { Router } from "express";
import authController from "../../../controllers/auth.controller";
import authMiddleware from "../../../middlewares/auth.middleware";
const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

authRouter.get("/profile", authMiddleware.requireLogin, authController.getProfile);

authRouter.patch("/refresh-token", authController.refreshToken);
authRouter.patch("/change-password", authMiddleware.requireLogin, authController.changePassword);
authRouter.patch("/update-profile", authMiddleware.requireLogin, authController.updateProfile);

authRouter.delete("/logout", authController.logout);

export default authRouter;
