import { NextFunction, Request, Response } from "express";
import { AccountRole } from "../entities/account.entity";
import authService from "../services/auth.service";
import helpers from "../utils/helpers";

class Middleware {
	verifyToken(req: Request, res: Response, next: NextFunction) {
		try {
			const reqHeader = req.headers["authorization"];

			if (reqHeader) {
				const token = reqHeader.split(" ")[1];
				const decoded = authService.verifyToken(token, "AccessToken");
				if (decoded) {
					res.locals.jwtPayload = decoded;
				}
			}
		} catch (error) {}

		next();
	}

	requireLogin(req: Request, res: Response, next: NextFunction) {
		this.verifyToken(req, res, () => {
			if (res.locals.jwtPayload) {
				next();
				return;
			}

			helpers.handleUnauthorized(res);
		});
	}

	isAdmin(req: Request, res: Response, next: NextFunction) {
		this.requireLogin(req, res, () => {
			if (res.locals.jwtPayload.role === AccountRole.ADMIN) {
				next();
				return;
			}

			helpers.handleUnauthorized(res);
		});
	}

	isCustomer(req: Request, res: Response, next: NextFunction) {
		this.requireLogin(req, res, () => {
			if (res.locals.jwtPayload.role === AccountRole.CUSTOMER) {
				next();
				return;
			}

			helpers.handleUnauthorized(res);
		});
	}
}

export default new Middleware();
