import { DeleteResult, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import helpers from "../utils/helpers";
import productRepository from "../repositories/product.repository";
import Product from "../entities/product.entity";

export type CreateProductDTO = {
	name: string;
	slug: string;
	mediaId: number;
	description: string;
};

export type ProductQueryParams = Partial<{
	name: string;
	description: string;
	slug: string;
}>;

class ProductService {
	handleQuery(query: ProductQueryParams) {
		const { description, name, slug } = query;
		return {
			...(slug ? { slug } : {}),
			...(name ? { name } : {}),
			...(description ? { description } : {}),
		};
	}

	getById(id: number): Promise<Product> {
		return productRepository.findOne({
			where: { id },
		});
	}

	getCount(query: any): Promise<number> {
		return productRepository.count({ where: this.handleQuery(query) });
	}

	getAll(query: any): Promise<Array<Product>> {
		return productRepository.find({
			...helpers.handlePaginateAndSort(query),
			select: this.handleQuery(query),
		});
	}

	create(body: CreateProductDTO): Product {
		return productRepository.create(body);
	}

	save(entity: Product): Promise<Product> {
		return productRepository.save(entity);
	}

	update(id: number, body: QueryDeepPartialEntity<Product>): Promise<UpdateResult> {
		return productRepository.update(id, body);
	}

	deleteById(id: number): Promise<DeleteResult> {
		return productRepository.delete(id);
	}

	deleteMany(ids: Array<number>): Promise<DeleteResult> {
		return productRepository.delete(ids);
	}
}
export default new ProductService();
