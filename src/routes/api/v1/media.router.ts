import { Router } from "express";
import mediaController from "../../../controllers/media.controller";
import authMiddleware from "../../../middlewares/auth.middleware";
import upload from "../../../middlewares/upload.middleware";
const mediaRouter = Router();

mediaRouter.post("/upload", authMiddleware.requireLogin, upload.single("file"), mediaController.upload);

export default mediaRouter;
