import { Request } from "express";
import { mkdirSync } from "fs";
import * as multer from "multer";
import { extname } from "path";
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;
const storage = multer.diskStorage({
	destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
		const date = new Date();
		const year = date.getFullYear().toString().substring(2);
		const month: string = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
		const day: string = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
		const path: string = `./public/images/${year}${month}${day}`;
		mkdirSync(path, { recursive: true });

		cb(null, path);
	},
	filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
		const ext = extname(file.originalname);
		cb(null, file.originalname.split(ext)[0] + new Date().getTime() + ext);
	},
});

const upload = multer({ storage: storage });

export default upload;
