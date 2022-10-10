import { Request, Response } from "express";
import mediaService from "../services/media.service";
import helpers from "../utils/helpers";
import { promisify } from "util";
import { unlink } from "fs";

class MediaController {
	async upload(req: Request, res: Response) {
		try {
			const media = await mediaService.upload(req.file.path as any);
			const unlinkAsync = promisify(unlink);
			const path = __dirname.split("src")[0];
			await unlinkAsync(path + req.file.path);
			helpers.handleCreated(res, media);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}
}

export default new MediaController();
