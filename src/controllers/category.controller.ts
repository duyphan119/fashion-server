import { Request, Response } from "express";
import Category from "../entities/category.entity";
import categoryService from "../services/category.service";
import helpers from "../utils/helpers";
import { ResponseItems } from "../utils/types";

class CategoryController {
	async create(req: Request, res: Response) {
		try {
			const { name, slug, parentId, mediaId, description } = req.body;

			const saved = await categoryService.save(categoryService.create({ name, slug, parentId, mediaId, description }));

			helpers.handleCreated(res, saved);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const data: ResponseItems<Category> = {
				items: await categoryService.getAll(req.query),
				count: await categoryService.getCount(req.query),
			};
			helpers.handleSuccess(res, data);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			helpers.handleSuccess(res, await categoryService.getById(+id));
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { affected } = await categoryService.update(+id, req.body);
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
			const { affected } = await categoryService.deleteById(+id);
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
			const { affected } = await categoryService.deleteMany(ids);
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

export default new CategoryController();
