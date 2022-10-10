import * as bcrypt from "bcrypt";
import { Response } from "express";
import { STATUS, CODE, MESSAGE } from "./constants";
import { QueryParams } from "./types";

class Helper {
	async hashPassword(rawPassword): Promise<string> {
		const salt = await bcrypt.genSalt();
		return bcrypt.hash(rawPassword, salt);
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
			...(data ? { data } : {}),
		});
	}

	handleCreated(res: Response, data?: any) {
		res.status(STATUS.CREATED).json({
			code: CODE.SUCCESS,
			message: MESSAGE.SUCCESS,
			...(data ? { data } : {}),
		});
	}

	handleUnauthorized(res: Response) {
		res.status(STATUS.UNAUTHORIZED).json({
			code: CODE.UNAUTHORIZED,
			message: MESSAGE.UNAUTHORIZED,
		});
	}

	handlePaginateAndSort(query: QueryParams): any {
		const { pageSize, page, sortBy, sortType } = query;
		return {
			...(pageSize ? { take: +pageSize } : {}),
			...(page && pageSize ? { skip: (+page - 1) * +pageSize } : {}),
			order: {
				[sortBy || "id"]: sortType || "desc",
			},
		};
	}
}

export default new Helper();
