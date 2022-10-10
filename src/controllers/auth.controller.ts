import { Request, Response } from "express";
import accountService from "../services/account.service";
import authService from "../services/auth.service";
import helpers from "../utils/helpers";

class AuthController {
	private refreshTokenCookieName: string;

	constructor() {
		this.refreshTokenCookieName = "refreshToken";
	}

	writeCookie(res: Response, payload: any) {
		res.cookie(this.refreshTokenCookieName, payload, {
			maxAge: authService.get().expiredRefreshTokenSecret,
			httpOnly: true,
			secure: false,
			sameSite: "lax",
		});
	}

	readCooke(req: Request) {
		return req.cookies[this.refreshTokenCookieName];
	}

	async register(req: Request, res: Response) {
		try {
			const { email, password, fullName, phone } = req.body;

			let existingAccount = await accountService.getByEmail(email);
			if (existingAccount) {
				helpers.handleError(res, {
					msg: "Email is available",
				});
				return;
			}

			const hash = helpers.hashPassword(password);
			const saved = accountService.create({ email, fullName, phone, hash });

			const payload: any = {
				id: saved.id,
				role: saved.role,
			};

			const accessToken = authService.createToken(payload, "AccessToken");
			const refreshToken = authService.createToken(payload, "RefreshToken");

			this.writeCookie(res, refreshToken);

			helpers.handleSuccess(res, {
				account: await accountService.getById(saved.id),
				accessToken,
				refreshToken,
			});
			return;
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			const existingAccount = await accountService.getByEmail(email);
			if (!existingAccount) {
				helpers.handleError(res, {
					msg: "Email is incorrect",
				});
				return;
			}

			const comparedResult = helpers.comparePassword(password, existingAccount.hash);
			if (!comparedResult) {
				helpers.handleError(res, {
					msg: "Password is incorrect",
				});
				return;
			}

			const payload: any = {
				id: existingAccount.id,
				role: existingAccount.role,
			};

			const accessToken = authService.createToken(payload, "AccessToken");
			const refreshToken = authService.createToken(payload, "RefreshToken");

			this.writeCookie(res, refreshToken);

			helpers.handleCreated(res, {
				account: await accountService.getById(existingAccount.id),
				accessToken,
				refreshToken,
			});
			return;
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	logout(req: Request, res: Response) {
		try {
			res.clearCookie(this.refreshTokenCookieName);
			helpers.handleSuccess(res);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	refreshToken(req: Request, res: Response) {
		try {
			const token = this.readCooke(req) || req.body.token;

			const decoded = authService.verifyToken(token, "RefreshToken");

			if (decoded) {
				const accessToken = authService.createToken(decoded, "AccessToken");
				const refreshToken = authService.createToken(decoded, "RefreshToken");
				this.writeCookie(res, refreshToken);
				helpers.handleSuccess(res, { accessToken, refreshToken });
				return;
			}

			helpers.handleUnauthorized(res);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async getProfile(req: Request, res: Response) {
		try {
			const { id } = res.locals.jwtPayload;
			const existingAccount = await accountService.getById(id);
			helpers.handleSuccess(res, existingAccount);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async updateProfile(req: Request, res: Response) {
		try {
			const { id } = res.locals.jwtPayload;
			const { affected } = await accountService.update(id, req.body);
			if (affected) {
				helpers.handleSuccess(res, await accountService.getById(id));
			}
			helpers.handleError(res);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async changePassword(req: Request, res: Response) {
		try {
			const { id } = res.locals.jwtPayload;
			const { newPassword } = req.body;

			const hash = helpers.hashPassword(newPassword);

			const { affected } = await accountService.update(id, { hash });
			if (affected) {
				helpers.handleSuccess(res, await accountService.getById(id));
			}
			helpers.handleError(res);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}
}

export default new AuthController();
