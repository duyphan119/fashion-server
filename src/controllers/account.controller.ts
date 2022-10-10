import { Request, Response } from "express";
import accountService from "../services/account.service";
import helpers from "../utils/helpers";

class AccountController {
	async create(req: Request, res: Response) {
		try {
			const { email, password, fullName, phone, gender, dob } = req.body;

			const hash = helpers.hashPassword(password);

			const saved = await accountService.create({ email, hash, fullName, phone, gender, dob: new Date(dob) });

			helpers.handleCreated(res, await accountService.getById(saved.id));
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			helpers.handleSuccess(res, {
				items: accountService.getAll(req.query),
				count: accountService.getCount(req.query),
			});
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			helpers.handleSuccess(res, await accountService.getById(+id));
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { affected } = await accountService.update(+id, req.body);
			if (affected) {
				helpers.handleSuccess(res);
				return;
			}
			helpers.handleError(res);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async deleteById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { affected } = await accountService.deleteById(+id);
			if (affected) {
				helpers.handleSuccess(res);
				return;
			}
			helpers.handleError(res);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async deleteByIds(req: Request, res: Response) {
		try {
			const { ids } = req.body;
			const { affected } = await accountService.deleteMany(ids);
			if (affected) {
				helpers.handleSuccess(res);
				return;
			}
			helpers.handleError(res);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}
}

export default new AccountController();
