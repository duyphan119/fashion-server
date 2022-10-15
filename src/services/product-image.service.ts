import { DeleteResult, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import helpers from "../utils/helpers";
import productImageRepository from "../repositories/product-image.repository";
import ProductImage from "../entities/product-image.entity";

export type CreateProductImageImageDTO = {
	variantId: string;
	mediaId: number;
	productId: number;
};

export type ProductImageQueryParams = Partial<{
	productName: string;
}>;

class ProductImageService {
	handleQuery(query: ProductImageQueryParams) {
		const { productName } = query;
		return {
			...(productName ? { product: { name: productName } } : {}),
		};
	}

	getById(id: number): Promise<ProductImage> {
		return productImageRepository.findOne({
			where: { id },
		});
	}

	getCount(query: any): Promise<number> {
		return productImageRepository.count({ where: this.handleQuery(query) });
	}

	getAll(query: any): Promise<Array<ProductImage>> {
		return productImageRepository.find({
			...helpers.handlePaginateAndSort(query),
			select: this.handleQuery(query),
		});
	}

	create(body: CreateProductImageImageDTO): ProductImage {
		return productImageRepository.create(body);
	}

	createMany(body: Array<CreateProductImageImageDTO>): Array<ProductImage> {
		return productImageRepository.create(body);
	}

	saveMany(entities: Array<ProductImage>): Promise<Array<ProductImage>> {
		return productImageRepository.save(entities);
	}

	save(entity: ProductImage): Promise<ProductImage> {
		return productImageRepository.save(entity);
	}

	update(id: number, body: QueryDeepPartialEntity<ProductImage>): Promise<UpdateResult> {
		return productImageRepository.update(id, body);
	}

	deleteById(id: number): Promise<DeleteResult> {
		return productImageRepository.delete(id);
	}

	deleteMany(ids: Array<number>): Promise<DeleteResult> {
		return productImageRepository.delete(ids);
	}
}
export default new ProductImageService();
