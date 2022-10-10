import accountRepository from "../repositories/account.repository";
import { Account } from "../entities/account.entity";
import { DeleteResult, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export type RegisterDTO = {
	email: string;
	hash: string;
	fullName: string;
	phone: string;
};

export type CreateAccountDTO = {
	dob: Date;
	gender: string;
	hash: string;
} & RegisterDTO;

class AccountService {
	getByEmail(email: string) {
		return accountRepository.findOneBy({ email });
	}

	getById(id: number) {
		return accountRepository.findOne({
			where: { id },
			select: { hash: false },
		});
	}

	getCount(query: any): Promise<number> {
		return accountRepository.count();
	}

	getAll(query: any) {
		const { pageSize, page, sortBy, sortType } = query;

		return accountRepository.find({
			select: {
				hash: false,
			},
		});
	}

	create(body: CreateAccountDTO | RegisterDTO): Account {
		return accountRepository.create(body);
	}

	update(id: number, body: QueryDeepPartialEntity<Account>): Promise<UpdateResult> {
		return accountRepository.update(id, body);
	}

	deleteById(id: number): Promise<DeleteResult> {
		return accountRepository.delete(id);
	}

	deleteMany(ids: Array<number>): Promise<DeleteResult> {
		return accountRepository.delete(ids);
	}
}
export default new AccountService();
