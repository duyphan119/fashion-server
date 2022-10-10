import { DeleteResult, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import helpers from "../utils/helpers";
import categoryRepository from "../repositories/category.repository";
import Category from "../entities/category.entity";

export type CreateCategoryDTO = {
	name: string;
	parentId: number;
	slug: string;
	mediaId: number;
	description: string;
};

class CategoryService {
	getBySlug(slug: string) {
		return categoryRepository.findOneBy({ slug });
	}

	getById(id: number): Promise<Category> {
		return categoryRepository.findOne({
			where: { id },
			select: {
				parent: {},
			},
		});
	}

	getCount(query: any): Promise<number> {
		return categoryRepository.count();
	}

	getAll(query: any): Promise<Array<Category>> {
		return categoryRepository.find({
			...helpers.handlePaginateAndSort(query),
			relations: {
				...this.handleDepth(2, "parent"),
				...this.handleDepth(2, "children"),
			},
		});
	}

	handleDepth(depth: number, key: string) {
		let result: any = {};
		let temp: any = result;
		let iter;
		let i = 1;
		while (i >= 1 && i <= depth) {
			temp[key] = i === depth ? true : {};
			if (i !== depth) {
				temp[key].media = true;
			}
			iter = temp[key];
			if (i !== depth) {
				temp = iter;
			}
			i++;
		}
		console.log(result);
		return result;
	}

	create(body: CreateCategoryDTO): Category {
		return categoryRepository.create(body);
	}

	save(entity: Category): Promise<Category> {
		return categoryRepository.save(entity);
	}

	update(id: number, body: QueryDeepPartialEntity<Category>): Promise<UpdateResult> {
		return categoryRepository.update(id, body);
	}

	deleteById(id: number): Promise<DeleteResult> {
		return categoryRepository.delete(id);
	}

	deleteMany(ids: Array<number>): Promise<DeleteResult> {
		return categoryRepository.delete(ids);
	}
}
export default new CategoryService();
