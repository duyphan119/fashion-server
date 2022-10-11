import { Request, Response } from "express";
import productService from "../services/product.service";
import helpers from "../utils/helpers";

class ProductController {
	async create(req: Request, res: Response) {
		try {
			const { name, description, slug, mediaId } = req.body;

			const saved = await productService.save(productService.create({ name, description, slug, mediaId }));

			helpers.handleCreated(res, await productService.getById(saved.id));
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			helpers.handleSuccess(res, {
				items: await productService.getAll(req.query),
				count: await productService.getCount(req.query),
			});
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			helpers.handleSuccess(res, await productService.getById(+id));
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { affected } = await productService.update(+id, req.body);
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
			const { affected } = await productService.deleteById(+id);
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
			const { affected } = await productService.deleteMany(ids);
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

export default new ProductController();
