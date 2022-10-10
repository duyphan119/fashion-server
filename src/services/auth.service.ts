import accountRepository from "../repositories/account.repository";
import * as jwt from "jsonwebtoken";

export type AuthServiceGetType = {
	accessTokenSecret: string;
	refreshTokenSecret: string;
	expiredAccessTokenSecret: number;
	expiredRefreshTokenSecret: number;
};

class AuthService {
	private accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET;
	private refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET;
	private expiredAccessTokenSecret: number = 1000 * 60 * 60;
	private expiredRefreshTokenSecret: number = 1000 * 60 * 60;

	get(): AuthServiceGetType {
		return {
			accessTokenSecret: this.accessTokenSecret,
			refreshTokenSecret: this.refreshTokenSecret,
			expiredAccessTokenSecret: this.expiredAccessTokenSecret,
			expiredRefreshTokenSecret: this.expiredRefreshTokenSecret,
		};
	}

	createToken(payload: any, type: "AccessToken" | "RefreshToken"): string {
		if (type === "AccessToken") {
			const accessToken = jwt.sign(payload, this.accessTokenSecret, {
				expiresIn: this.expiredAccessTokenSecret,
			});
			return accessToken;
		} else if (type === "RefreshToken") {
			const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
				expiresIn: this.expiredRefreshTokenSecret,
			});
			return refreshToken;
		}
		return "";
	}

	verifyToken(token: string, type: "AccessToken" | "RefreshToken"): any {
		if (type === "AccessToken") {
			return jwt.verify(token, this.accessTokenSecret);
		} else if (type === "RefreshToken") {
			return jwt.verify(token, this.refreshTokenSecret);
		}
	}
}

export default new AuthService();
