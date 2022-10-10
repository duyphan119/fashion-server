import * as bcrypt from "bcrypt";
import { Response } from "express";
import { STATUS, CODE, MESSAGE } from "./constants";

class Helper {
	private salt: string;

	constructor() {
		this.salt = bcrypt.genSaltSync();
	}

	hashPassword(rawPassword): string {
		return bcrypt.hashSync(rawPassword, this.salt);
	}

	comparePassword(rawPassword, hash): boolean {
		return bcrypt.compareSync(rawPassword, hash);
	}

	handleError(res: Response, error?: any) {
		console.log(error);
		res.status(STATUS.INTERVAL_SERVER_ERROR).json({
			code: CODE.ERROR,
			message: MESSAGE.ERROR,
			...(error ? { data: error } : {}),
		});
	}

	handleSuccess(res: Response, data?: any) {
		res.status(STATUS.SUCCESS).json({
			code: CODE.SUCCESS,
			message: MESSAGE.SUCCESS,
			...(data || {}),
		});
	}

	handleCreated(res: Response, data?: any) {
		res.status(STATUS.CREATED).json({
			code: CODE.SUCCESS,
			message: MESSAGE.SUCCESS,
			...(data || {}),
		});
	}

	handleUnauthorized(res: Response) {
		res.status(STATUS.UNAUTHORIZED).json({
			code: CODE.UNAUTHORIZED,
			message: MESSAGE.UNAUTHORIZED,
		});
	}
}

export default new Helper();
