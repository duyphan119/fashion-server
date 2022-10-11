import accountRepository from "../repositories/account.repository";
import Account from "../entities/account.entity";
import { DeleteResult, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import helpers from "../utils/helpers";

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

export type AccountQueryParams = Partial<{
	fullName: string;
	email: string;
	gender: string;
}>;

class AccountService {
	handleQuery(query: AccountQueryParams) {
		const { fullName, email, gender } = query;
		return {
			...(fullName ? { fullName } : {}),
			...(email ? { email } : {}),
			...(gender ? { gender } : {}),
		};
	}

	getByEmail(email: string): Promise<Account> {
		return accountRepository.findOneBy({ email });
	}

	getById(id: number) {
		return accountRepository.findOne({
			where: { id },
			select: { hash: false },
		});
	}

	getCount(query: any): Promise<number> {
		return accountRepository.count({
			where: this.handleQuery(query),
		});
	}

	getAll(query: any): Promise<Array<Account>> {
		return accountRepository.find({
			select: { hash: false },
			...helpers.handlePaginateAndSort(query),
			where: this.handleQuery(query),
		});
	}

	create(body: CreateAccountDTO | RegisterDTO): Account {
		return accountRepository.create(body);
	}

	save(entity: Account): Promise<Account> {
		return accountRepository.save(entity);
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
