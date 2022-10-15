import { Request, Response } from "express";
import productImageService from "../services/product-image.service";
import helpers from "../utils/helpers";

class ProductImageController {
	async create(req: Request, res: Response) {
		try {
			const { productId, variantId, mediaId } = req.body;

			const saved = await productImageService.save(productImageService.create({ productId, variantId, mediaId }));

			helpers.handleCreated(res, saved);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async createMany(req: Request, res: Response) {
		try {
			const saved = await productImageService.saveMany(
				productImageService.createMany(
					req.body.map((body) => {
						const { productId, variantId, mediaId } = body;
						return { productId, variantId, mediaId };
					})
				)
			);

			helpers.handleCreated(res, saved);
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			helpers.handleSuccess(res, {
				items: await productImageService.getAll(req.query),
				count: await productImageService.getCount(req.query),
			});
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			helpers.handleSuccess(res, await productImageService.getById(+id));
		} catch (error) {
			helpers.handleError(res, error);
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { affected } = await productImageService.update(+id, req.body);
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
			const { affected } = await productImageService.deleteById(+id);
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
			const { affected } = await productImageService.deleteMany(ids);
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

export default new ProductImageController();
