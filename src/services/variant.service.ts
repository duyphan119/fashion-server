import { DeleteResult, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import helpers from "../utils/helpers";
import variantRepository from "../repositories/variant.repository";
import Variant from "../entities/variant.entity";

export type CreateVariantDTO = {
	id: string;
	type: string;
	name: string;
};

export type VariantQueryParams = Partial<{
	id: string;
	name: string;
	type: string;
}>;

class VariantService {
	handleQuery(query: VariantQueryParams) {
		const { id, name, type } = query;
		return {
			...(id ? { id } : {}),
			...(name ? { name } : {}),
			...(type ? { type } : {}),
		};
	}

	getById(id: string): Promise<Variant> {
		return variantRepository.findOne({
			where: { id },
		});
	}

	getCount(query: any): Promise<number> {
		return variantRepository.count({ where: this.handleQuery(query) });
	}

	getAll(query: any): Promise<Array<Variant>> {
		return variantRepository.find({
			...helpers.handlePaginateAndSort(query),
			select: this.handleQuery(query),
		});
	}

	create(body: CreateVariantDTO): Variant {
		return variantRepository.create(body);
	}

	save(entity: Variant): Promise<Variant> {
		return variantRepository.save(entity);
	}

	update(id: string, body: QueryDeepPartialEntity<Variant>): Promise<UpdateResult> {
		return variantRepository.update(id, body);
	}

	deleteById(id: string): Promise<DeleteResult> {
		return variantRepository.delete(id);
	}

	deleteMany(ids: Array<string>): Promise<DeleteResult> {
		return variantRepository.delete(ids);
	}
}
export default new VariantService();
