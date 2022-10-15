import { Request, Response } from "express";
import variantService from "../services/variant.service";
import helpers from "../utils/helpers";

class VariantController {
	async create(req: Request, res: Response) {
		try {
			const { id, name, type } = req.body;

			const saved = await variantService.save(variantService.create({ id, name, type }));

			helpers.handleCreated(res, saved);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			helpers.handleSuccess(res, {
				items: await variantService.getAll(req.query),
				count: await variantService.getCount(req.query),
			});
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			helpers.handleSuccess(res, await variantService.getById(id));
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { affected } = await variantService.update(id, req.body);
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
			const { affected } = await variantService.deleteById(id);
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
			const { affected } = await variantService.deleteMany(ids);
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

export default new VariantController();
